import os

workspace = '/home/ng/Suhalaya Travels website'
for root, dirs, files in os.walk(workspace):
    for f in files:
        if f.endswith('.html'):
            filepath = os.path.join(root, f)
            with open(filepath, 'r') as file:
                content = file.read()
            
            contact_btn_str = '<a href="/contact_us" class="btn btn-secondary" style="padding: 8px 24px; font-size: 0.9rem; margin-right: 12px; background: transparent; border: 2px solid var(--color-gold); color: var(--color-obsidian); font-weight: 700;">CONTACT US</a>\n        '
            if contact_btn_str in content:
                new_content = content.replace(contact_btn_str, '')
                with open(filepath, 'w') as file:
                    file.write(new_content)
                print(f"Removed Contact Us button from {filepath}")
