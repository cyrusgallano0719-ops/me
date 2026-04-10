/**
* Template Name: MyPortfolio
* Template URL: https://bootstrapmade.com/myportfolio-bootstrap-portfolio-website-template/
* Updated: Aug 08 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Floating Hire Me Button - Text Rotation
   */
  const hireMeBtn = document.getElementById('hire-me-btn');
  const btnText = hireMeBtn ? hireMeBtn.querySelector('.btn-text') : null;
  const textOptions = ['Hire Me', "Let's Build", 'Available'];
  let currentTextIndex = 0;
  let hoverCount = 0;

  if (hireMeBtn && btnText) {
    hireMeBtn.addEventListener('mouseenter', () => {
      hoverCount++;
      currentTextIndex = (currentTextIndex + 1) % textOptions.length;
      btnText.textContent = textOptions[currentTextIndex];
    });

    hireMeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = document.getElementById('contact-modal');
      if (modal) {
        modal.classList.add('active');
      }
    });
  }

  /**
   * Contact Modal - Close functionality
   */
  const contactModal = document.getElementById('contact-modal');
  const modalClose = document.getElementById('modal-close');
  const modalContactForm = document.getElementById('modal-contact-form');

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      if (contactModal) {
        contactModal.classList.remove('active');
      }
    });
  }

  // Close modal when clicking outside the content
  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        contactModal.classList.remove('active');
      }
    });
  }

  // Form submission handling
  if (modalContactForm) {
    modalContactForm.addEventListener('submit', (e) => {
      // Formspree handles the submission, but we can add a loading state if needed
      // The form will submit normally and redirect
    });
  }

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (contactModal && contactModal.classList.contains('active')) {
        contactModal.classList.remove('active');
      }
      const aiModal = document.getElementById('ai-recommender-modal');
      if (aiModal && aiModal.classList.contains('active')) {
        aiModal.classList.remove('active');
      }
    }
  });

  // AI recomender floating button + modal handlers
  function ensureAIRecommenderUI() {
    if (!document.getElementById('ai-recommender-float-btn')) {
      const floatBtn = document.createElement('button');
      floatBtn.id = 'ai-recommender-float-btn';
      floatBtn.className = 'ai-float-btn';
      floatBtn.title = 'AI Service Recommender';
      floatBtn.innerHTML = '<i class="bi bi-lightning-charge-fill"></i><span>AI Recommender</span>';
      document.body.appendChild(floatBtn);
    }

    if (!document.getElementById('ai-recommender-modal')) {
      const modal = document.createElement('div');
      modal.id = 'ai-recommender-modal';
      modal.className = 'contact-modal';
      modal.innerHTML = `
        <div class="modal-content">
          <button type="button" class="modal-close" id="ai-modal-close">&times;</button>
          <h3 class="modal-title">AI Service Recommender</h3>
          <div class="modal-form" style="max-width: 100%;">
            <div class="form-group">
              <label for="modal-need">What do you need?</label>
              <select id="modal-need" class="form-control">
                <option value="website-starter">Website Starter Package</option>
                <option value="ecommerce">E-commerce Store</option>
                <option value="internal-system">Internal System (POS, CRM)</option>
                <option value="ui-ux-design">UI/UX Design + Branding</option>
                <option value="ai-media">AI Media Editing</option>
              </select>
            </div>
            <div class="form-group">
              <label for="modal-budget">Budget?</label>
              <select id="modal-budget" class="form-control">
                <option value="low">< ₱15,000 (Good Fit)</option>
                <option value="medium">₱15,000 - ₱40,000 (Recommended)</option>
                <option value="high">> ₱40,000 (Premium)</option>
              </select>
            </div>
            <div class="form-group">
              <label for="modal-timeline">Timeline (days)?</label>
              <input type="number" id="modal-timeline" class="form-control" min="1" value="7" />
            </div>
            <div class="mb-3">
              <button id="modal-recommender-submit" class="btn btn-primary">Get Recommendation</button>
              <button id="modal-recommender-quote-btn" class="btn btn-secondary ms-2">Create Quotation</button>
            </div>
            <div id="modal-recommender-output" class="badge bg-light text-dark p-3" style="white-space: pre-wrap; min-height: 120px;"></div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
  }

  ensureAIRecommenderUI();

  const aiFloatBtn = document.getElementById('ai-recommender-float-btn');
  const aiModal = document.getElementById('ai-recommender-modal');
  const aiModalClose = document.getElementById('ai-modal-close');
  const modalNeed = document.getElementById('modal-need');
  const modalBudget = document.getElementById('modal-budget');
  const modalTimeline = document.getElementById('modal-timeline');
  const modalOutput = document.getElementById('modal-recommender-output');
  const modalRecommendBtn = document.getElementById('modal-recommender-submit');
  const modalQuoteBtn = document.getElementById('modal-recommender-quote-btn');

  function openRecommender() {
    // On all pages, show the modal dialog first.
    if (aiModal) {
      aiModal.classList.add('active');
      return;
    }

    // Fallback: if modal is unavailable, scroll to section when available.
    const section = document.getElementById('ai-service-recommender');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
  }

  if (aiFloatBtn) {
    aiFloatBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openRecommender();
    });
  }

  if (aiModalClose && aiModal) {
    aiModalClose.addEventListener('click', () => {
      aiModal.classList.remove('active');
    });

    aiModal.addEventListener('click', (e) => {
      if (e.target === aiModal) {
        aiModal.classList.remove('active');
      }
    });
  }

  const getModalValues = () => ({
    need: modalNeed?.value ?? '',
    budget: modalBudget?.value ?? '',
    timeline: modalTimeline?.value ?? '7'
  });

  if (modalRecommendBtn && modalOutput) {
    modalRecommendBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const { need, budget, timeline } = getModalValues();
      modalOutput.textContent = 'Thinking... generating your recommendation...';
      try {
        const responseText = await generateResponse(need, budget, timeline);
        modalOutput.textContent = responseText;
      } catch (err) {
        modalOutput.textContent = 'Unable to generate recommendation right now; please try again later.';
        console.error('Recommender modal error:', err);
      }
    });
  }

  if (modalQuoteBtn && modalOutput) {
    modalQuoteBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const { need, budget, timeline } = getModalValues();
      modalOutput.textContent = 'Creating quotation... please wait...';
      try {
        const responseText = await generateResponse(need, budget, timeline);
        modalOutput.textContent = buildQuotation(need, budget, timeline, responseText);
      } catch (err) {
        modalOutput.textContent = 'Unable to build quotation right now; please try again later.';
        console.error('Quotation modal error:', err);
      }
    });
  }

  // AI Service Recommender (interactive flow)
  const recommenderNeed = document.getElementById('recommender-need');
  const recommenderBudget = document.getElementById('recommender-budget');
  const recommenderTimeline = document.getElementById('recommender-timeline');
  const recommenderOutput = document.getElementById('recommender-output');
  const recommenderBtn = document.getElementById('recommender-submit');
  const quoteBtn = document.getElementById('recommender-quote-btn');

  const GEMINI_API_KEY = 'AIzaSyCYuI1JLyOZa-dMHEfAq-uW7SbamN2OLGA';
  const GEMINI_MODEL = 'text-bison-001';

  function buildLocalRecommendation(need, budget, timeline) {
    let packageName = '';
    let reason = '';

    switch (need) {
      case 'website-starter':
        packageName = 'Website Starter Package';
        reason = 'Quick launch site with responsive design and content setup.';
        break;
      case 'ecommerce':
        packageName = 'E-commerce Package';
        reason = 'Storefront with product catalog, checkout, and inventory workflow.';
        break;
      case 'internal-system':
        packageName = 'Business System Package';
        reason = 'Custom POS/CRM automation for operational efficiency.';
        break;
      case 'ui-ux-design':
        packageName = 'UI/UX Design Package';
        reason = 'A polished prototype with branding and motion interactions.';
        break;
      case 'ai-media':
        packageName = 'AI Media Editing Package';
        reason = 'Fast content editing with modern AI imagery/video enhancements.';
        break;
      default:
        packageName = 'Custom Package';
        reason = 'Tailored to your project requirements.';
    }

    let budgetMsg = 'best matched to your budget tier.';
    if (budget === 'low') budgetMsg = 'optimized for cost efficiency while maintaining quality.';
    if (budget === 'high') budgetMsg = 'using advanced features and premium integrations.';

    return `Based on your needs, I recommend our ${packageName}. It ${budgetMsg} This can be completed in ${timeline} day(s).\n\nWhy this wins:\n- Removes decision friction\n- Feels personalized\n- Boosts inquiries\n\nNext step: Send a message via the contact button and I’ll prepare a quick proposal based on your requirements.`;
  }

  async function callGeminiAPI(need, budget, timeline) {
    const prompt = `AI Service Recommender:\nNeed: ${need}\nBudget: ${budget}\nTimeline: ${timeline} days\nPlease recommend the best service package, explain why, and suggest next step.`;

    const url = `https://generativelanguage.googleapis.com/v1beta2/models/${GEMINI_MODEL}:generateText?key=${encodeURIComponent(GEMINI_API_KEY)}`;

    const body = {
      prompt: {
        text: prompt
      },
      temperature: 0.4,
      candidateCount: 1
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      throw new Error(`Gemini API error ${res.status}`);
    }

    const data = await res.json();
    return data?.candidates?.[0]?.output ?? null;
  }

  function buildQuotation(need, budget, timeline, coreText) {
    return `QUOTE REQUEST\n- Need: ${need}\n- Budget: ${budget}\n- Timeline: ${timeline} day(s)\n\n${coreText}\n\nEstimated costs and deliverables can be defined after client discovery.`;
  }

  async function generateResponse(need, budget, timeline) {
    let responseText;
    try {
      responseText = await callGeminiAPI(need, budget, timeline);
    } catch (apiErr) {
      console.warn('Gemini API not reachable, falling back to local recommender.', apiErr);
      responseText = buildLocalRecommendation(need, budget, timeline);
    }

    if (!responseText) {
      responseText = buildLocalRecommendation(need, budget, timeline);
    }

    return responseText;
  }

  if (recommenderBtn && recommenderOutput) {
    recommenderBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const need = recommenderNeed?.value ?? '';
      const budget = recommenderBudget?.value ?? '';
      const timeline = recommenderTimeline?.value ?? '7';

      recommenderOutput.textContent = 'Thinking... generating your recommendation...';

      try {
        const responseText = await generateResponse(need, budget, timeline);
        recommenderOutput.textContent = responseText;
      } catch (err) {
        recommenderOutput.textContent = 'Unable to generate recommendation right now; please try again later.';
        console.error('Recommender error:', err);
      }
    });
  }

  if (quoteBtn && recommenderOutput) {
    quoteBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const need = recommenderNeed?.value ?? '';
      const budget = recommenderBudget?.value ?? '';
      const timeline = recommenderTimeline?.value ?? '7';

      recommenderOutput.textContent = 'Creating quotation... please wait...';

      try {
        const responseText = await generateResponse(need, budget, timeline);
        recommenderOutput.textContent = buildQuotation(need, budget, timeline, responseText);
      } catch (err) {
        recommenderOutput.textContent = 'Unable to build quotation right now; please try again later.';
        console.error('Quotation error:', err);
      }
    });
  }

  // Hire Me Button mobile optimization
  const hireMeButtonOptimize = () => {
    const hireMeBtn = document.getElementById('hire-me-btn');
    const aiFloatBtn = document.getElementById('ai-recommender-float-btn');
    
    if (window.innerWidth < 576) {
      // Stack buttons vertically on very small screens
      if (hireMeBtn) {
        hireMeBtn.style.bottom = '20px';
        hireMeBtn.style.width = '50px';
        hireMeBtn.style.height = '50px';
      }
      if (aiFloatBtn) {
        aiFloatBtn.style.bottom = '90px';
      }
    }
  };

  hireMeButtonOptimize();
  window.addEventListener('resize', hireMeButtonOptimize);

  // Prevent zoom on input focus on mobile
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      if (window.innerWidth <= 768) {
        // Scroll the input into view but don't rely on browser zoom
        this.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

})();