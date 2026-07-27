import os

regions = ['south-bengaluru', 'north-bengaluru', 'east-bengaluru', 'central-west-bengaluru']
base_dir = '/home/ng/Suhalaya Travels website/areas'

for region in regions:
    filepath = os.path.join(base_dir, region, 'index.html')
    if not os.path.exists(filepath):
        print(f"Skipping {region}, file not found")
        continue
    
    with open(filepath, 'r') as file:
        content = file.read()
    
    # We want to replace:
    # <div id="hierarchy-view" class="hierarchy-container grid-3" style="gap: 30px;">
    # with:
    # <div class="grid-2" style="gap: 50px; align-items: flex-start;">
    #   <div>
    #     <div id="hierarchy-view" class="hierarchy-container grid-2" style="gap: 30px;">
    
    # And we want to replace:
    #       </div>
    #     </div>
    #   </section>
    # (after the cards) with:
    #       </div>
    #     </div>
    #     <!-- QUICK INQUIRY FORM SIDEBAR --> ... </div>
    #   </div>
    # </section>

    # Get the display name of the region from the <h1> tag
    import re
    title_match = re.search(r'<h1[^>]*>(.*?)</h1>', content)
    region_name = title_match.group(1).title() if title_match else region.replace('-', ' ').title()

    standard_form = f"""
        <!-- QUICK INQUIRY FORM SIDEBAR -->
        <div style="background: #f4f9fc; padding: 32px; border-radius: 16px; border: 1px solid #e2e8f0; position: sticky; top: 100px; box-shadow: 0 10px 30px rgba(1, 90, 132, 0.05);">
          <h3 style="color: #015A84; font-size: 1.4rem; margin-bottom: 8px;">Book Cab in {region_name}</h3>
          <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 20px;">Fill out your details to receive an instant corporate quote.</p>

          <form onsubmit="handleTechParkForm(event, '{region_name}')">
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
        </div>
      </div>
"""

    if 'handleTechParkForm' not in content:
        # We need to wrap the hierarchy container
        # Let's find the start of the hierarchy view
        content = content.replace(
            '<div id="hierarchy-view" class="hierarchy-container grid-3" style="gap: 30px;">',
            '<div class="grid-2" style="gap: 50px; align-items: flex-start;">\n        <div>\n          <div id="hierarchy-view" class="hierarchy-container grid-2" style="gap: 30px;">'
        )
        
        # Now find the end of the container
        # The container is closed right before:
        # </section>
        # <!-- FALLBACK CRAWLABLE LINKS FOR SEO -->
        
        # Actually it's:
        #       </div>
        #     </div>
        #   </section>
        # Let's just find the closing tags and replace them.
        
        content = re.sub(
            r'(\s+)</div>\n(\s+)</div>\n(\s+)</section>\n\s+<!-- FALLBACK',
            r'\1</div>\n\2</div>\n' + standard_form + r'\3</section>\n  <!-- FALLBACK',
            content
        )
        
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Added form to {region}")

