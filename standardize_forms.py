import os
import re

areas_dir = '/home/ng/Suhalaya Travels website/areas'
for root, dirs, files in os.walk(areas_dir):
    for f in files:
        if f.endswith('index.html'):
            filepath = os.path.join(root, f)
            with open(filepath, 'r') as file:
                content = file.read()
            
            # Find the onsubmit parameter
            match = re.search(r"handleTechParkForm\(event,\s*'([^']+)'\)", content)
            if not match:
                continue
            tech_park_name = match.group(1)
            
            standard_form = f"""        <!-- QUICK INQUIRY FORM SIDEBAR -->
        <div style="background: #f4f9fc; padding: 32px; border-radius: 16px; border: 1px solid #e2e8f0; position: sticky; top: 100px; box-shadow: 0 10px 30px rgba(1, 90, 132, 0.05);">
          <h3 style="color: #015A84; font-size: 1.4rem; margin-bottom: 8px;">Book Cab in {tech_park_name}</h3>
          <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 20px;">Fill out your details to receive an instant corporate quote.</p>

          <form onsubmit="handleTechParkForm(event, '{tech_park_name}')">
            <div style="margin-bottom: 16px;">
              <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #015A84; margin-bottom: 6px;">Your Name *</label>
              <input type="text" required placeholder="Enter full name" style="width: 100%; padding: 12px 14px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 0.95rem;">
            </div>

            <div style="margin-bottom: 16px;">
              <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #015A84; margin-bottom: 6px;">Phone Number *</label>
              <input type="tel" required placeholder="Enter 10-digit mobile number" style="width: 100%; padding: 12px 14px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 0.95rem;">
            </div>

            <div style="margin-bottom: 16px;">
              <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #015A84; margin-bottom: 6px;">Select Service Type</label>
              <select style="width: 100%; padding: 12px 14px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 0.95rem; background: #ffffff;">
                <option>Corporate Car Rental</option>
                <option>Employee Transportation</option>
                <option>Airport Pick / Drop</option>
                <option>Outstation Rental</option>
                <option>Luxury Chauffeur</option>
                <option>Industrial Staff Transportation</option>
              </select>
            </div>

            <div style="margin-bottom: 20px;">
              <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #015A84; margin-bottom: 6px;">Pickup Address / Requirements</label>
              <textarea rows="3" placeholder="Specify pickup location, building, or gate" style="width: 100%; padding: 12px 14px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 0.95rem;"></textarea>
            </div>

            <button type="submit" style="width: 100%; padding: 14px; background: #015A84; color: #ffffff; border: none; border-radius: 8px; font-weight: 700; font-size: 1rem; cursor: pointer; transition: background 0.3s ease;">
              Send Inquiry via WhatsApp
            </button>
          </form>
        </div>"""
            
            # replace the entire sidebar block
            content_new = re.sub(r'<!-- QUICK INQUIRY FORM SIDEBAR -->.*?</form>\s*</div>', standard_form, content, flags=re.DOTALL)
            
            # ALSO remove the inline script if it exists
            content_new = re.sub(r'<script>\s*function handleTechParkForm.*?</script>', '', content_new, flags=re.DOTALL)
            
            if content_new != content:
                with open(filepath, 'w') as file:
                    file.write(content_new)
                print(f"Updated {filepath}")
