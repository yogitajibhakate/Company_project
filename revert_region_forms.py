import os
import re

regions = ['south-bengaluru', 'north-bengaluru', 'east-bengaluru', 'central-west-bengaluru']
base_dir = '/home/ng/Suhalaya Travels website/areas'

for region in regions:
    filepath = os.path.join(base_dir, region, 'index.html')
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r') as file:
        content = file.read()

    # Revert the wrapper at the top
    content = content.replace(
        '<div class="grid-2" style="gap: 50px; align-items: flex-start;">\n        <div>\n          <div id="hierarchy-view" class="hierarchy-container grid-2" style="gap: 30px;">',
        '<div id="hierarchy-view" class="hierarchy-container grid-3" style="gap: 30px;">'
    )
    
    # Remove the form at the bottom
    # We look for the end of the hierarchy-view, which originally was just `</div>\n    </div>\n  </section>`
    # We replaced it with:
    # `</div>\n        </div>\n        <!-- QUICK INQUIRY FORM SIDEBAR --> ... </div>\n      </div>\n  </section>`
    
    # Let's use regex to remove from `<!-- QUICK INQUIRY FORM SIDEBAR -->` down to the matching `</div>\n      </div>`
    content = re.sub(
        r'\s*</div>\n\s*</div>\n\s*<!-- QUICK INQUIRY FORM SIDEBAR -->.*?</form>\n\s*</div>\n\s*</div>',
        '\n      </div>',
        content,
        flags=re.DOTALL
    )

    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Reverted {region}")
