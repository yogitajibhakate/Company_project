/**
 * SUHALAYA TRAVELS - PREMIUM REDESIGN JAVASCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- PREVENT PAST DATES & TIMES IN FORMS ---
  const dateInputs = document.querySelectorAll('input[type="date"]');
  if (dateInputs.length > 0) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const todayLocal = `${year}-${month}-${day}`;

    dateInputs.forEach(dateInput => {
      dateInput.setAttribute('min', todayLocal);

      const form = dateInput.closest('form');
      if (form) {
        const timeInput = form.querySelector('input[type="time"]');
        if (timeInput) {
          const updateTimeMin = () => {
            if (dateInput.value === todayLocal) {
              const currentNow = new Date();
              const hours = String(currentNow.getHours()).padStart(2, '0');
              const minutes = String(currentNow.getMinutes()).padStart(2, '0');
              timeInput.setAttribute('min', `${hours}:${minutes}`);
            } else {
              timeInput.removeAttribute('min');
            }
          };
          dateInput.addEventListener('change', updateTimeMin);
          updateTimeMin();

          // Instantly validate time on change
          timeInput.addEventListener('change', () => {
            if (dateInput.value === todayLocal && timeInput.value) {
              const currentNow = new Date();
              const [selHours, selMins] = timeInput.value.split(':');
              const selTime = new Date();
              selTime.setHours(selHours, selMins, 0, 0);
              if (selTime < currentNow) {
                alert('You cannot select a past time for today.');
                timeInput.value = ''; // Instantly clear invalid time
              }
            }
          });
        }
      }
    });
  }

  // --- STICKY HEADER SCROLL EFFECT ---
  const header = document.querySelector('.header');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  // --- MOBILE NAV TOGGLE ---
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      // Toggle menu icons
      if (navMenu.classList.contains('open')) {
        navToggle.innerHTML = `
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
          </svg>
        `;
      } else {
        navToggle.innerHTML = `
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        `;
      }
    });

    // Close menu when clicking navigation link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.innerHTML = `
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        `;
      });
    });
  }

  // --- SCROLL REVEAL ANIMATION ---
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  revealElements.forEach(el => revealObserver.observe(el));

  // --- STAT COUNTER ANIMATION ---
  const stats = document.querySelectorAll('.trust-number');
  const startCounting = (statEl) => {
    const target = parseInt(statEl.getAttribute('data-target'), 10);
    const suffix = statEl.getAttribute('data-suffix') || '';
    let current = 0;
    const duration = 2000; // 2 seconds
    const stepTime = Math.max(Math.floor(duration / target), 15);

    const timer = setInterval(() => {
      current += Math.ceil(target / (duration / stepTime));
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      statEl.textContent = current.toLocaleString() + suffix;
    }, stepTime);
  };

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounting(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  stats.forEach(stat => statsObserver.observe(stat));

  // --- HERO QUICK INQUIRY TAB ROUTING ---
  const inquiryTabs = document.querySelectorAll('.inquiry-tab-btn');
  const inquiryContents = document.querySelectorAll('.inquiry-tab-content');
  if (inquiryTabs.length > 0) {
    inquiryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        inquiryTabs.forEach(t => t.classList.remove('active'));
        // Add active to current
        tab.classList.add('active');

        // Hide all contents
        inquiryContents.forEach(c => c.classList.remove('active'));
        // Show current content
        const targetId = tab.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  }

  // --- OUTSTATION ROUND-TRIP TOGGLE --- b
  const handleOutstationToggle = () => {
    const returnContainer = document.getElementById('outReturnDateContainer');
    if (!returnContainer) return;

    const selectedRadio = document.querySelector('input[name="outstation_type"]:checked');
    if (selectedRadio && selectedRadio.value === 'Round Trip') {
      returnContainer.style.display = 'block';
    } else {
      returnContainer.style.display = 'none';
    }
  };

  document.addEventListener('change', (e) => {
    if (e.target && e.target.name === 'outstation_type') {
      handleOutstationToggle();
    }
  });

  handleOutstationToggle();

  // --- FLEET FILTER TAB SWITCHING ---
  const fleetTabs = document.querySelectorAll('.fleet-tab-btn');
  const fleetPanels = document.querySelectorAll('.fleet-panel');
  if (fleetTabs.length > 0) {
    fleetTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        fleetTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.getAttribute('data-category');
        fleetPanels.forEach(panel => {
          if (category === 'all' || panel.getAttribute('data-panel') === category) {
            panel.classList.add('active');
          } else {
            panel.classList.remove('active');
          }
        });
      });
    });
  }

  // --- TESTIMONIALS CAROUSEL ---
  const track = document.querySelector('.testimonials-track');
  const slides = Array.from(document.querySelectorAll('.testimonial-slide'));
  const dotsContainer = document.querySelector('.testimonials-dots');
  const carouselContainer = document.querySelector('.testimonials-slider-container');

  if (track && slides.length > 0 && dotsContainer) {
    let currentIndex = 0;

    // Create navigation dots dynamically
    slides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => moveToSlide(index));
      dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.querySelectorAll('.dot'));

    const moveToSlide = (index) => {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach(d => d.classList.remove('active'));
      dots[index].classList.add('active');
      currentIndex = index;
    };

    // Automatic sliding
    let autoSlide = setInterval(() => {
      let nextIndex = (currentIndex + 1) % slides.length;
      moveToSlide(nextIndex);
    }, 5000);

    // Pause auto slide on hover
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
      carouselContainer.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
          let nextIndex = (currentIndex + 1) % slides.length;
          moveToSlide(nextIndex);
        }, 5000);
      });
    }
  }

  // --- FAQ ACCORDION TOGGLE ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all items
        faqItems.forEach(i => i.classList.remove('active'));
        // Open clicked one if it wasn't open
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // --- CENTRALIZED LEAD GENERATION & SUCCESS MODAL ---
  const GOOGLE_SHEETS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw7iSQXZ10jWjlszcgvop6BB17OOLWxNfGy2Hc0rnf-JY50NI4M0NNtKfMf2sLtVY3B-Q/exec'; // Replace this with the deployed Google Apps Script Web App URL

  const forms = document.querySelectorAll('form');
  const successOverlay = document.getElementById('successOverlay');
  const successCloseBtn = document.getElementById('successCloseBtn');
  const successWhatsAppBtn = document.getElementById('successWhatsAppBtn');

  let lastSubmissionText = "Hello Suhalaya Travels, I would like to enquire about your transportation services.";

  if (successCloseBtn && successOverlay) {
    successCloseBtn.addEventListener('click', () => {
      successOverlay.style.display = 'none';
    });
  }

  if (successWhatsAppBtn && successOverlay) {
    successWhatsAppBtn.addEventListener('click', () => {
      const waUrl = `https://wa.me/919900556611?text=${encodeURIComponent(lastSubmissionText)}`;
      window.open(waUrl, '_blank');
      successOverlay.style.display = 'none';
    });
  }

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      // Prevent actual form post
      e.preventDefault();

      // Perform simple validation
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');

      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = 'var(--color-error)';
        } else {
          input.style.borderColor = 'rgba(226, 232, 240, 0.8)';
        }
      });

      if (!isValid) {
        alert('Please fill out all required fields.');
        return;
      }

      // Validate past date and time
      const dateInput = form.querySelector('input[type="date"]');
      const timeInput = form.querySelector('input[type="time"]');

      if (dateInput && dateInput.value) {
        const selectedDate = new Date(dateInput.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
          alert('You cannot select a past date.');
          dateInput.style.borderColor = 'var(--color-error)';
          return;
        }

        if (timeInput && timeInput.value && selectedDate.getTime() === today.getTime()) {
          const currentTime = new Date();
          const [hours, minutes] = timeInput.value.split(':');
          const selectedTime = new Date();
          selectedTime.setHours(hours, minutes, 0, 0);

          if (selectedTime < currentTime) {
            alert('You cannot select a past time for today.');
            timeInput.style.borderColor = 'var(--color-error)';
            return;
          }
        }
      }

      // Collect data
      const formData = new FormData(form);
      const data = {};
      let detailsString = "";
      formData.forEach((value, key) => {
        data[key] = value;
        detailsString += `${key}: ${value}\n`;
      });

      // Add source page tracking
      let pageTitle = document.title.split('|')[0].trim();

      const normalizedData = {
        name: data.name || data.fullname || data.full_name || "Not Provided",
        phone: data.phone || data.mobile || data.contact || "Not Provided",
        service: data.service || data.vehicle_type || data.booking_type || data.car_type || "General Inquiry",
        details: detailsString.trim() || "No extra details",
        source_page: pageTitle || window.location.pathname || "Website Form"
      };

      console.log('Lead Captured Successfully:', normalizedData);

      // Trigger Google Sheets Integration for ALL forms
      if (GOOGLE_SHEETS_SCRIPT_URL) {
        fetch(GOOGLE_SHEETS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(normalizedData)
        })
          .then(() => console.log('Successfully posted lead to Google Sheets.'))
          .catch(err => console.error('Error posting lead to Google Sheets:', err));
      }

      // Reset success overlay default state
      const successTitle = successOverlay ? successOverlay.querySelector('h3') : null;
      const successText = successOverlay ? successOverlay.querySelector('p') : null;
      if (successWhatsAppBtn) successWhatsAppBtn.style.display = 'inline-block';
      if (successText) successText.textContent = 'Thank you for choosing Suhalaya Travels! We have logged your request. You can now choose to immediately follow up on WhatsApp to secure your booking details with our operational dispatch controllers.';
      if (successTitle) successTitle.textContent = 'Booking Request Sent';

      if (data.service === 'Local Chauffeur Drive') {
        // Customize success modal for local booking (No WhatsApp redirect button)
        if (successWhatsAppBtn) successWhatsAppBtn.style.display = 'none';
        if (successText) successText.textContent = 'Thank you for choosing Suhalaya Travels! Your local chauffeur drive booking request has been logged successfully. Our team will contact you shortly.';
        if (successTitle) successTitle.textContent = 'Booking Request Received';

        // Show success modal overlay if it exists
        if (successOverlay) {
          successOverlay.style.display = 'flex';
        } else {
          alert('Thank you! Your local chauffeur drive booking request has been logged successfully.');
        }
      } else {
        // Generate pre-filled WhatsApp message based on form inputs for all other forms
        let waMessage = `Hello Suhalaya Travels,\n\nI would like to inquire about your transportation services.\n`;
        if (data.name) waMessage += `*Name:* ${data.name}\n`;
        if (data.phone) waMessage += `*Phone:* ${data.phone}\n`;
        if (data.email) waMessage += `*Email:* ${data.email}\n`;
        if (data.company) waMessage += `*Company:* ${data.company}\n`;
        if (data.service) waMessage += `*Service:* ${data.service}\n`;
        if (data.city) waMessage += `*City:* ${data.city}\n`;
        if (data.trip_type) waMessage += `*Trip Type:* ${data.trip_type}\n`;
        if (data.address) waMessage += `*Address:* ${data.address}\n`;
        if (data.from_loc) waMessage += `*From:* ${data.from_loc}\n`;
        if (data.to_loc) waMessage += `*To:* ${data.to_loc}\n`;
        if (data.outstation_type) waMessage += `*Outstation Type:* ${data.outstation_type}\n`;
        if (data.date) waMessage += `*Travel Date:* ${data.date}\n`;
        if (data.time) waMessage += `*Pickup Time:* ${data.time}\n`;
        if (data.pickup) waMessage += `*Pickup Location:* ${data.pickup}\n`;
        if (data.destination) waMessage += `*Destination:* ${data.destination}\n`;
        if (data.vehicle) waMessage += `*Vehicle Preference:* ${data.vehicle}\n`;
        if (data.message) waMessage += `*Message:* ${data.message}\n`;

        lastSubmissionText = waMessage;

        // Show success modal overlay if it exists
        if (successOverlay) {
          successOverlay.style.display = 'flex';
        } else {
          // Fallback alert instead of WhatsApp redirection
          alert('Inquiry successfully sent! We will contact you shortly.');
        }
      }

      // Reset form
      form.reset();
    });
  });

  // --- PREMIUM CHATBOT WIDGET INTEGRATION (n8n Webhook Enabled) ---
  const N8N_CHAT_WEBHOOK_URL = 'https://profithax.app.n8n.cloud/webhook/suhalayatravels.com';

  let currentUsername = localStorage.getItem('stpl_chat_username') || '';
  let currentPhone = localStorage.getItem('stpl_chat_phone') || '';
  let chatSessionId = '';
  let chatHistory = [];

  const getPhoneKey = (phone) => (phone || '').replace(/\D/g, '');

  const loadUserSessionAndHistory = () => {
    const phoneKey = getPhoneKey(currentPhone);
    if (!phoneKey) return;

    // Load unique session ID tied to phone number
    chatSessionId = localStorage.getItem('stpl_chat_session_id_' + phoneKey);
    if (!chatSessionId) {
      chatSessionId = 'stpl_thread_' + phoneKey;
      localStorage.setItem('stpl_chat_session_id_' + phoneKey, chatSessionId);
    }

    // Load history tied to phone number
    const storedHistory = localStorage.getItem('stpl_chat_history_' + phoneKey);
    if (storedHistory) {
      chatHistory = JSON.parse(storedHistory);
    } else {
      // First welcome greeting for this phone number
      chatHistory = [
        {
          sender: 'bot',
          text: `Namaste ${currentUsername || 'Guest'}! Welcome to Suhalaya Travels. How can I help you with your corporate travel, fleet bookings, or employee transportation needs today?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ];
      saveChatHistory();
    }
  };

  const saveChatHistory = () => {
    const phoneKey = getPhoneKey(currentPhone);
    if (!phoneKey) return;
    localStorage.setItem('stpl_chat_history_' + phoneKey, JSON.stringify(chatHistory));
  };

  const formatChatMessage = (text) => {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  };

  const renderChatHistory = () => {
    const messagesContainer = document.getElementById('stplChatMessages');
    if (!messagesContainer) return;

    messagesContainer.innerHTML = '';
    chatHistory.forEach(msg => {
      const msgElement = document.createElement('div');
      msgElement.className = `stpl-chat-msg ${msg.sender}`;
      msgElement.innerHTML = `
        <div class="stpl-chat-bubble">${formatChatMessage(msg.text)}</div>
        <div class="stpl-chat-msg-time">${msg.timestamp}</div>
      `;
      messagesContainer.appendChild(msgElement);
    });
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  // Helper: Append bot bubble
  const addBotMessage = (text) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    chatHistory.push({
      sender: 'bot',
      text: text,
      timestamp: time
    });
    saveChatHistory();
    renderChatHistory();
  };

  // Helper: Append user bubble
  const addUserMessage = (text) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    chatHistory.push({
      sender: 'user',
      text: text,
      timestamp: time
    });
    saveChatHistory();
    renderChatHistory();
  };

  // Helper: Toggle typing indicator
  const setTypingIndicator = (show) => {
    const messagesContainer = document.getElementById('stplChatMessages');
    if (!messagesContainer) return;

    const existing = document.getElementById('stplTyping');
    if (show && !existing) {
      const typingElement = document.createElement('div');
      typingElement.className = 'stpl-typing-indicator';
      typingElement.id = 'stplTyping';
      typingElement.innerHTML = `
        <span class="stpl-typing-dot"></span>
        <span class="stpl-typing-dot"></span>
        <span class="stpl-typing-dot"></span>
      `;
      messagesContainer.appendChild(typingElement);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    } else if (!show && existing) {
      existing.remove();
    }
  };

  // Render chatbot window view depending on username state
  const renderChatWindow = () => {
    const chatWindow = document.getElementById('stplChatWindow');
    if (!chatWindow) return;

    if (!currentUsername) {
      // Login View
      chatWindow.innerHTML = `
        <div class="stpl-chat-header">
          <div class="stpl-chat-header-info">
            <div class="stpl-chat-avatar">ST</div>
            <div class="stpl-chat-status-box">
              <h4 class="stpl-chat-title">Suhalaya Assistant</h4>
              <p class="stpl-chat-subtitle">Offline Support</p>
            </div>
          </div>
          <button class="stpl-chat-close-btn" id="stplChatClose" title="Close Chat">
            <svg viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
            </svg>
          </button>
        </div>
        <div class="stpl-chat-messages" id="stplChatMessages" style="justify-content: center; align-items: center; text-align: center; gap: 15px; padding: 24px; display: flex; flex-direction: column;">
          <div class="stpl-chat-avatar" style="width: 54px; height: 54px; font-size: 1.3rem; margin: 0 auto;">ST</div>
          <h4 style="color: var(--color-navy); font-family: var(--font-headings); font-weight: 600; margin: 0; font-size: 1.05rem;">Suhalaya Chat Support</h4>
          <p style="color: var(--color-slate); font-size: 0.85rem; line-height: 1.4; margin: 0;">Please enter your name and phone number to continue or start a new inquiry.</p>
          <input type="text" id="stplChatUsernameInput" placeholder="Enter your name..." style="width: 100%; max-width: 220px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 24px; padding: 10px 16px; color: var(--color-obsidian); text-align: center; outline: none; font-size: 0.9rem; transition: border-color 0.2s;" />
          <input type="tel" id="stplChatPhoneInput" placeholder="Phone number (10 digits)..." style="width: 100%; max-width: 220px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 24px; padding: 10px 16px; color: var(--color-obsidian); text-align: center; outline: none; font-size: 0.9rem; transition: border-color 0.2s;" />
          <button id="stplChatLoginBtn" style="background: var(--color-gold); color: var(--color-obsidian); border: none; padding: 10px 24px; border-radius: 24px; font-weight: 600; cursor: pointer; transition: transform 0.2s; font-family: var(--font-headings); font-size: 0.85rem;">Start Chatting</button>
        </div>
      `;

      const closeBtn = document.getElementById('stplChatClose');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          chatWindow.classList.remove('open');
          sessionStorage.setItem('stpl_chat_dismissed', 'true');
        });
      }

      const loginBtn = document.getElementById('stplChatLoginBtn');
      const nameInput = document.getElementById('stplChatUsernameInput');
      const phoneInput = document.getElementById('stplChatPhoneInput');
      if (loginBtn && nameInput && phoneInput) {
        const performLogin = () => {
          const name = nameInput.value.trim();
          const phone = phoneInput.value.trim();
          if (!name || !phone) {
            alert("Please enter both your name and phone number to continue.");
            return;
          }
          currentUsername = name;
          currentPhone = phone;
          localStorage.setItem('stpl_chat_username', name);
          localStorage.setItem('stpl_chat_phone', phone);

          // Log the lead to Google Sheets (Chatbot specific sheet)
          const CHATBOT_SHEETS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxPuK5k4dex0f8Rs9TrFLd68RjLya_6mvU8cYrVNmZzBrIo5dDIxlECE5edLXkZPEJa/exec'; // User will replace this
          if (CHATBOT_SHEETS_SCRIPT_URL) {
            fetch(CHATBOT_SHEETS_SCRIPT_URL, {
              method: 'POST',
              mode: 'no-cors',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                action: "log_chat",
                name: name,
                phone: phone,
                service: "Chat Support Started",
                details: "User initiated a new chat session.",
                source_page: "Website Chatbot"
              })
            }).catch(err => console.error("Error logging chat lead", err));
          }

          loadUserSessionAndHistory();
          renderChatWindow();
        };

        loginBtn.addEventListener('click', performLogin);
        nameInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') performLogin();
        });
        phoneInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') performLogin();
        });
      }

    } else {
      // Chat view
      chatWindow.innerHTML = `
        <div class="stpl-chat-header">
          <div class="stpl-chat-header-info">
            <div class="stpl-chat-avatar">ST</div>
            <div class="stpl-chat-status-box">
              <h4 class="stpl-chat-title">Suhalaya Assistant</h4>
              <p class="stpl-chat-subtitle">
                <span class="stpl-chat-pulse"></span>
                ${currentUsername} (Online)
              </p>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <button class="reset-btn" id="stplChatReset" title="Reset Current Conversation" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: white; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 500; cursor: pointer; transition: all 0.3s ease; font-family: var(--font-headings);">New Trip</button>
            <button class="stpl-chat-close-btn" id="stplChatLogout" title="Change User / Logout" style="background: none; border: none; color: rgba(255,255,255,0.6); padding: 4px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
              <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: currentColor;">
                <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
              </svg>
            </button>
            <button class="stpl-chat-close-btn" id="stplChatClose" title="Close Chat">
              <svg viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="stpl-chat-messages" id="stplChatMessages">
          <!-- Messages loaded dynamically -->
        </div>
        <div class="stpl-chat-footer">
          <form class="stpl-chat-form" id="stplChatForm">
            <input type="text" class="stpl-chat-input" id="stplChatInput" placeholder="Ask a question..." required autocomplete="off">
            <button type="submit" class="stpl-chat-send-btn" title="Send Message">
              <svg viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </form>
        </div>
      `;

      renderChatHistory();

      const closeBtn = document.getElementById('stplChatClose');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          chatWindow.classList.remove('open');
          sessionStorage.setItem('stpl_chat_dismissed', 'true');
        });
      }

      const logoutBtn = document.getElementById('stplChatLogout');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          const confirmLogout = confirm("Are you sure you want to end the chat? Your history will be cleared.");
          if (confirmLogout) {
            // Send full chat transcript to Google Sheets before clearing
            const transcript = chatHistory.map(msg => `[${new Date(msg.timestamp).toLocaleTimeString()}] ${msg.sender}: ${msg.text}`).join('\\n');
            const CHATBOT_SHEETS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxPuK5k4dex0f8Rs9TrFLd68RjLya_6mvU8cYrVNmZzBrIo5dDIxlECE5edLXkZPEJa/exec'; // User will replace this
            if (CHATBOT_SHEETS_SCRIPT_URL) {
              fetch(CHATBOT_SHEETS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  action: "log_chat",
                  name: currentUsername,
                  phone: currentPhone || "Not Provided",
                  service: "Chat Support Ended (Transcript)",
                  details: "CHAT TRANSCRIPT:\\n\\n" + transcript,
                  source_page: "Website Chatbot"
                })
              }).catch(err => console.error("Error sending transcript", err));
            }

            currentUsername = '';
            currentPhone = '';
            localStorage.removeItem('stpl_chat_username');
            localStorage.removeItem('stpl_chat_phone');
            renderChatWindow();
          }
        });
      }

      const resetBtn = document.getElementById('stplChatReset');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          const phoneKey = getPhoneKey(currentPhone);
          if (phoneKey) {
            localStorage.removeItem('stpl_chat_session_id_' + phoneKey);
            localStorage.removeItem('stpl_chat_history_' + phoneKey);
          }
          loadUserSessionAndHistory();
          renderChatHistory();
        });
      }

      const chatForm = document.getElementById('stplChatForm');
      const chatInput = document.getElementById('stplChatInput');
      if (chatForm && chatInput) {
        chatForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const messageText = chatInput.value.trim();
          if (!messageText) return;

          addUserMessage(messageText);
          chatInput.value = '';
          setTypingIndicator(true);

          try {
            const response = await fetch(N8N_CHAT_WEBHOOK_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                threadId: chatSessionId,
                username: currentUsername,
                phone: currentPhone,
                message: messageText,
                date: new Date().toISOString()
              })
            });

            setTypingIndicator(false);

            if (!response.ok) {
              throw new Error('Network response not ok');
            }

            let reply = '';
            const responseText = await response.text();
            if (responseText.includes("Too many requests")) {
              reply = "✈️ Our agents are busy booking flights. Wait 60 seconds and try again!";
            } else {
              try {
                const data = JSON.parse(responseText);
                reply = data.reply || data.output || data.text || data.response || responseText;
              } catch {
                reply = responseText;
              }
            }

            addBotMessage(reply);

          } catch (err) {
            console.error('Chat webhook error:', err);
            setTypingIndicator(false);
            addBotMessage("I am currently unable to connect to the live assistant server. Please contact our 24/7 helpline at <strong>+91 99005 56611</strong> or tap our WhatsApp link for instant support.");
          }
        });
      }
    }
  };

  // Inject Chatbot DOM Elements
  const injectChatbot = () => {
    const widget = document.createElement('div');
    widget.className = 'stpl-chat-widget';
    widget.innerHTML = `
      <div class="stpl-chat-trigger" id="stplChatTrigger" title="Chat with Suhalaya Support">
        <svg viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
        </svg>
      </div>
      <div class="stpl-chat-window" id="stplChatWindow"></div>
    `;
    document.body.appendChild(widget);

    loadUserSessionAndHistory();
    renderChatWindow();
  };

  // Initialize Chat Event Listeners (Strictly click-only opening)
  const initChatListeners = () => {
    const trigger = document.getElementById('stplChatTrigger');
    const chatWindow = document.getElementById('stplChatWindow');

    if (!trigger || !chatWindow) return;

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      chatWindow.classList.toggle('open');
      if (chatWindow.classList.contains('open')) {
        const chatInput = document.getElementById('stplChatInput');
        if (chatInput) chatInput.focus();
        const usernameInput = document.getElementById('stplChatUsernameInput');
        if (usernameInput) usernameInput.focus();
      } else {
        sessionStorage.setItem('stpl_chat_dismissed', 'true');
      }
    });
  };

  // Run chatbot injection
  injectChatbot();
  initChatListeners();

});

// --- GLOBAL FORM HANDLER FOR AREA/TECH PARK PAGES ---
window.handleTechParkForm = function (e, techParkName) {
  e.preventDefault();
  const form = e.target;
  const name = form.elements[0].value;
  const phone = form.elements[1].value;
  const service = form.elements[2].value;
  const details = form.elements[3].value;

  const data = {
    name: name,
    phone: phone,
    service: service,
    details: details,
    source_page: "Tech Park: " + techParkName
  };

  const GOOGLE_SHEETS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw7iSQXZ10jWjlszcgvop6BB17OOLWxNfGy2Hc0rnf-JY50NI4M0NNtKfMf2sLtVY3B-Q/exec";
  fetch(GOOGLE_SHEETS_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).catch(err => console.error("Sheet error:", err));

  const msg = `Hello Suhalaya Travels, I need a cab in ${techParkName}.
Name: ${name}
Phone: ${phone}
Service: ${service}
Details: ${details}`;

  // Show success alert instead of opening WhatsApp
  alert("Inquiry successfully sent! We will contact you shortly.");
  form.reset();
  form.reset();
};


document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById('booking-section');
  const leftCar = document.getElementById('car-left');
  const rightCar = document.getElementById('car-right');

  if (section && leftCar && rightCar) {
    function updateCarParallax() {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll progress
      let progress = (windowHeight - rect.top) / (windowHeight + rect.height / 2);
      progress = Math.max(0, Math.min(1, progress));

      // Smooth Zoom In / Zoom Out scale between 0.8 and 1.05
      const scale = 0.8 + (progress * 0.25);

      // Horizontal parallax movement
      const leftX = (1 - progress) * 60;
      const rightX = (1 - progress) * -60;

      leftCar.style.transform = `translate(${leftX}px, 0) scale(${scale})`;
      rightCar.style.transform = `translate(${rightX}px, 0) scale(${scale})`;
    }

    window.addEventListener('scroll', updateCarParallax, { passive: true });
    window.addEventListener('resize', updateCarParallax);
    updateCarParallax();
  }

  // ================= DATE & TIME VALIDATION =================
  const dateInput = document.getElementById('pickupDate');
  const timeInput = document.getElementById('pickupTime');
  const form = document.getElementById('taxiBookingForm');

  if (dateInput && timeInput && form) {
    // 1. Restrict past dates by setting the 'min' attribute to today
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;
    dateInput.min = todayStr;

    // 2. Validate time when date or time changes
    function updateTimeConstraints() {
      if (!dateInput.value || !timeInput.value) return;

      const selectedDate = new Date(dateInput.value);
      const currentDate = new Date();

      // Compare Year, Month, Date directly
      const isToday = selectedDate.getFullYear() === currentDate.getFullYear() &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getDate() === currentDate.getDate();

      if (isToday) {
        const currentHours = currentDate.getHours().toString().padStart(2, '0');
        const currentMinutes = currentDate.getMinutes().toString().padStart(2, '0');
        const currentTimeStr = `${currentHours}:${currentMinutes}`;

        if (timeInput.value < currentTimeStr) {
          timeInput.setCustomValidity('Please select a future time for today.');
        } else {
          timeInput.setCustomValidity('');
        }
      } else {
        timeInput.setCustomValidity('');
      }
    }

    dateInput.addEventListener('change', updateTimeConstraints);
    timeInput.addEventListener('change', updateTimeConstraints);
  }
});

// Global Tab Switcher for Booking Form (LOCAL | AIRPORT | OUTSTATION)
window.switchBookingTab = function (type) {
  const tabLocal = document.getElementById('tab-local');
  const tabAirport = document.getElementById('tab-airport');
  const tabOutstation = document.getElementById('tab-outstation');
  const serviceTypeInput = document.getElementById('serviceType');
  const outstationOptions = document.getElementById('outstationOptions');

  const emailCol = document.getElementById('emailCol');
  const cityCol = document.getElementById('cityCol');
  const tripCol = document.getElementById('tripCol');
  const addressCol = document.getElementById('addressCol');
  const fromCol = document.getElementById('fromCol');
  const toCol = document.getElementById('toCol');
  const returnDateCol = document.getElementById('returnDateCol');

  if (!tabLocal || !tabAirport || !tabOutstation) return;

  const activeTabClass = 'booking-tab py-3 px-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 border border-[#00AEEF] bg-[#00AEEF] text-white shadow-md transition cursor-pointer';
  const inactiveTabClass = 'booking-tab py-3 px-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 border border-gray-200 bg-white text-[#0A589F] hover:bg-sky-50 transition cursor-pointer';

  if (type === 'local') {
    tabLocal.className = activeTabClass;
    tabAirport.className = inactiveTabClass;
    tabOutstation.className = inactiveTabClass;

    if (serviceTypeInput) serviceTypeInput.value = 'Local Cab Booking';
    if (outstationOptions) outstationOptions.classList.add('hidden');

    if (emailCol) { emailCol.classList.remove('sm:col-span-2'); emailCol.classList.remove('hidden'); }
    if (cityCol) cityCol.classList.remove('hidden');
    if (tripCol) tripCol.classList.add('hidden');
    if (addressCol) addressCol.classList.add('hidden');
    if (fromCol) fromCol.classList.add('hidden');
    if (toCol) toCol.classList.add('hidden');
    if (returnDateCol) returnDateCol.classList.add('hidden');

  } else if (type === 'airport') {
    tabLocal.className = inactiveTabClass;
    tabAirport.className = activeTabClass;
    tabOutstation.className = inactiveTabClass;

    if (serviceTypeInput) serviceTypeInput.value = 'Airport Transfer Booking';
    if (outstationOptions) outstationOptions.classList.add('hidden');

    if (emailCol) { emailCol.classList.remove('sm:col-span-2'); emailCol.classList.remove('hidden'); }
    if (cityCol) cityCol.classList.remove('hidden');
    if (tripCol) tripCol.classList.remove('hidden');
    if (addressCol) addressCol.classList.remove('hidden');
    if (fromCol) fromCol.classList.add('hidden');
    if (toCol) toCol.classList.add('hidden');
    if (returnDateCol) returnDateCol.classList.add('hidden');

  } else if (type === 'outstation') {
    tabLocal.className = inactiveTabClass;
    tabAirport.className = inactiveTabClass;
    tabOutstation.className = activeTabClass;

    if (serviceTypeInput) serviceTypeInput.value = 'Outstation Travel Booking';
    if (outstationOptions) outstationOptions.classList.remove('hidden');

    if (emailCol) emailCol.classList.remove('hidden');
    if (cityCol) cityCol.classList.add('hidden');
    if (tripCol) tripCol.classList.add('hidden');
    if (addressCol) addressCol.classList.add('hidden');
    if (fromCol) fromCol.classList.remove('hidden');
    if (toCol) toCol.classList.remove('hidden');

    const modeRoundTrip = document.getElementById('modeRoundTrip');
    if (modeRoundTrip && modeRoundTrip.checked) {
      if (returnDateCol) returnDateCol.classList.remove('hidden');
    } else {
      if (returnDateCol) returnDateCol.classList.add('hidden');
    }
  }
};

window.toggleOutstationTripMode = function (mode) {
  const returnDateCol = document.getElementById('returnDateCol');
  if (mode === 'roundtrip') {
    if (returnDateCol) returnDateCol.classList.remove('hidden');
  } else {
    if (returnDateCol) returnDateCol.classList.add('hidden');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.switchBookingTab('local');
});

// ================= DATE & TIME VALIDATION =================
document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById('pickupDate');
  const timeInput = document.getElementById('pickupTime');
  const form = document.getElementById('taxiBookingForm');

  if (dateInput && timeInput && form) {
    // 1. Restrict past dates by setting the 'min' attribute to today
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;
    dateInput.min = todayStr;

    // 2. Validate time when date or time changes
    function updateTimeConstraints() {
      if (!dateInput.value || !timeInput.value) return;

      const selectedDate = new Date(dateInput.value);
      const currentDate = new Date();

      // Compare Year, Month, Date directly
      const isToday = selectedDate.getFullYear() === currentDate.getFullYear() &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getDate() === currentDate.getDate();

      if (isToday) {
        const currentHours = currentDate.getHours().toString().padStart(2, '0');
        const currentMinutes = currentDate.getMinutes().toString().padStart(2, '0');
        const currentTimeStr = `${currentHours}:${currentMinutes}`;

        if (timeInput.value < currentTimeStr) {
          timeInput.setCustomValidity('Please select a future time for today.');
        } else {
          timeInput.setCustomValidity('');
        }
      } else {
        timeInput.setCustomValidity('');
      }
    }

    dateInput.addEventListener('change', updateTimeConstraints);
    timeInput.addEventListener('change', updateTimeConstraints);

    // Handle Form Submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      updateTimeConstraints(); // Final check before submit
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      alert('Ride Booked Successfully!');
    });
  }
});
