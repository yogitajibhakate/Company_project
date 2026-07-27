function doPost(e) {
  var output = ContentService.createTextOutput();
  
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];    
    var request = JSON.parse(e.postData.contents);
    var action = request.action;
    
    // Helper to find row index by slug or fallback to requested rowIndex
    function getTargetRowIndex() {
      if (request.slug) {
        var data = sheet.getDataRange().getValues();
        var headers = data[0];
        var slugColIndex = headers.indexOf('slug');
        if (slugColIndex === -1) slugColIndex = 2; // Default to column C (0-based index 2)
        
        for (var i = 1; i < data.length; i++) {
          if (String(data[i][slugColIndex]).trim() === String(request.slug).trim()) {
            return i + 1; // Sheet row numbers are 1-indexed
          }
        }
      }
      return request.rowIndex;
    }

    if (action === "add_row") {
      sheet.appendRow(request.rowData);
      output.setContent(JSON.stringify({"success": true}));
    } 
    else if (action === "update_status") {
      var targetRow = getTargetRowIndex();
      var newStatus = request.status;
      
      var headers = sheet.getDataRange().getValues()[0];
      var statusColIndex = headers.indexOf('Status') + 1; 
      
      if (statusColIndex === 0) {
        statusColIndex = headers.length + 1;
        sheet.getRange(1, statusColIndex).setValue('Status');
      }
      
      if (targetRow && targetRow > 0) {
        sheet.getRange(targetRow, statusColIndex).setValue(newStatus);
        output.setContent(JSON.stringify({"success": true}));
      } else {
        output.setContent(JSON.stringify({"success": false, "message": "Row not found"}));
      }
    } 
    else if (action === "delete_row") {
      var targetRow = getTargetRowIndex();
      if (targetRow && targetRow > 0) {
        sheet.deleteRow(targetRow);
        output.setContent(JSON.stringify({"success": true}));
      } else {
        output.setContent(JSON.stringify({"success": false, "message": "Row not found"}));
      }
    }
    
  } catch(error) {
    output.setContent(JSON.stringify({"error": error.toString()}));
  }
  
  return output.setMimeType(ContentService.MimeType.JSON);
}

function doOptions(e) {
  return ContentService.createTextOutput("").setMimeType(ContentService.MimeType.JSON);
}
