import os
import re

workspace = '/home/ng/Suhalaya Travels website'
for root, dirs, files in os.walk(workspace):
    for f in files:
        if f.endswith('.html'):
            filepath = os.path.join(root, f)
            with open(filepath, 'r') as file:
                content = file.read()
            
            # Check if it has a header-cta without a CONTACT US button
            if '<div class="header-cta">' in content and 'href="/contact_us" class="btn btn-secondary"' not in content:
                # Re-write the CTA to include the contact us button before the login button
                new_content = content.replace(
                    '<div class="header-cta">\n        <a href="/admin/"',
                    '<div class="header-cta">\n        <a href="/contact_us" class="btn btn-secondary" style="padding: 8px 24px; font-size: 0.9rem; margin-right: 12px; background: transparent; border: 2px solid var(--color-gold); color: var(--color-obsidian); font-weight: 700;">CONTACT US</a>\n        <a href="/admin/"'
                )
                if new_content != content:
                    with open(filepath, 'w') as file:
                        file.write(new_content)
                    print(f"Injected Contact Us button in {filepath}")
