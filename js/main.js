/**
 * Ziva Courier Service - Main JavaScript
 * Handles rates filtering, quote calculation, and interactive modal/booking forms.
 */

// Comprehensive Rates Data matching client rate card + global destinations
const rateCardData = [
  {
    country: "USA",
    code: "us",
    flag: "https://flagcdn.com/w160/us.png",
    rate: 984,
    condition: "For Sending 50 Kg above",
    deliveryTime: "3 - 5 Days",
    tag: "Most Popular"
  },
  {
    country: "UK",
    code: "gb",
    flag: "https://flagcdn.com/w160/gb.png",
    rate: 635,
    condition: "For Sending 50 Kg above",
    deliveryTime: "3 - 5 Days",
    tag: "Special Deal"
  },
  {
    country: "CANADA",
    code: "ca",
    flag: "https://flagcdn.com/w160/ca.png",
    rate: 875,
    condition: "For Sending 50 Kg above",
    deliveryTime: "4 - 6 Days",
    tag: "High Demand"
  },
  {
    country: "Australia",
    code: "au",
    flag: "https://flagcdn.com/w160/au.png",
    rate: 775,
    condition: "For Sending 50 Kg above",
    deliveryTime: "4 - 6 Days",
    tag: "Best Rate"
  },
  {
    country: "Singapore",
    code: "sg",
    flag: "https://flagcdn.com/w160/sg.png",
    rate: 643,
    condition: "For Sending 50 Kg above",
    deliveryTime: "2 - 4 Days",
    tag: "Express Air"
  },
  {
    country: "HongKong",
    code: "hk",
    flag: "https://flagcdn.com/w160/hk.png",
    rate: 570,
    condition: "For Sending 50 Kg above",
    deliveryTime: "2 - 4 Days",
    tag: "Fast Track"
  },
  {
    country: "Thailand",
    code: "th",
    flag: "https://flagcdn.com/w160/th.png",
    rate: 579,
    condition: "For Sending 50 Kg above",
    deliveryTime: "3 - 4 Days",
    tag: "Direct Air"
  },
  {
    country: "Malaysia",
    code: "my",
    flag: "https://flagcdn.com/w160/my.png",
    rate: 666,
    condition: "For Sending 50 Kg above",
    deliveryTime: "3 - 5 Days",
    tag: "Popular"
  },
  {
    country: "New Zealand",
    code: "nz",
    flag: "https://flagcdn.com/w160/nz.png",
    rate: 830,
    condition: "For Sending 50 Kg above",
    deliveryTime: "4 - 6 Days",
    tag: "Special Route"
  },
  {
    country: "UAE",
    code: "ae",
    flag: "https://flagcdn.com/w160/ae.png",
    rate: 459,
    condition: "For Sending 50 Kg above",
    deliveryTime: "2 - 4 Days",
    tag: "Lowest Price"
  },
  {
    country: "Germany",
    code: "de",
    flag: "https://flagcdn.com/w160/de.png",
    rate: 720,
    condition: "For Sending 50 Kg above",
    deliveryTime: "3 - 5 Days",
    tag: "Europe Special"
  },
  {
    country: "Denmark",
    code: "dk",
    flag: "https://flagcdn.com/w160/dk.png",
    rate: 795,
    condition: "For Sending 50 Kg above",
    deliveryTime: "4 - 6 Days",
    tag: "Europe Air"
  },
  {
    country: "France",
    code: "fr",
    flag: "https://flagcdn.com/w160/fr.png",
    rate: 710,
    condition: "For Sending 50 Kg above",
    deliveryTime: "3 - 5 Days",
    tag: "Express"
  },
  {
    country: "Saudi Arabia",
    code: "sa",
    flag: "https://flagcdn.com/w160/sa.png",
    rate: 490,
    condition: "For Sending 50 Kg above",
    deliveryTime: "3 - 5 Days",
    tag: "Gulf Route"
  },
  {
    country: "Italy",
    code: "it",
    flag: "https://flagcdn.com/w160/it.png",
    rate: 740,
    condition: "For Sending 50 Kg above",
    deliveryTime: "4 - 6 Days",
    tag: "Europe Air"
  },
  {
    country: "Qatar",
    code: "qa",
    flag: "https://flagcdn.com/w160/qa.png",
    rate: 480,
    condition: "For Sending 50 Kg above",
    deliveryTime: "2 - 4 Days",
    tag: "Gulf Route"
  }
];

// WhatsApp & Phone Numbers
const WHATSAPP_NUM = "917300030628";
const CALL_NUM = "+919929674710";
const PICKUP_NUM = "+918306006570";

// Render Rate Cards
function renderRateCards(filterText = "", targetId = "rateCardContainer") {
  const container = document.getElementById(targetId);
  if (!container) return;

  const filtered = rateCardData.filter(item => 
    item.country.toLowerCase().includes(filterText.toLowerCase())
  );

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="fa-solid fa-plane-slash text-muted fa-3x mb-3"></i>
        <h5 class="fw-bold">No exact match found for "${filterText}"</h5>
        <p class="text-muted">We ship to over 220+ countries worldwide! Contact our desk for a custom quotation.</p>
        <a href="https://wa.me/${WHATSAPP_NUM}?text=Hi%20Ziva%20Courier,%20I%20want%20to%20inquire%20rate%20for%20shipping%20to%20${encodeURIComponent(filterText)}" 
           target="_blank" class="btn btn-secondary-custom">
           <i class="fa-brands fa-whatsapp me-2"></i> Inquire on WhatsApp
        </a>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-4">
      <div class="rate-card">
        <div>
          <div class="country-flag-wrap">
            <img src="${item.flag}" alt="${item.country} Flag" loading="lazy" onerror="this.src='https://flagcdn.com/w160/un.png'">
          </div>
          <h4 class="country-name">${item.country}</h4>
          <div class="price-row">
            <i class="fa-solid fa-indian-rupee-sign"></i> ${item.rate} <span class="fs-6 fw-normal">per Kg*</span>
          </div>
          <p class="disclaimer-text">*${item.condition}</p>
        </div>
        <div class="mt-2">
          <button type="button" class="btn btn-card-quote w-100" onclick="openQuoteModal('${item.country}', ${item.rate})">
            <i class="fa-solid fa-truck-fast"></i> Book Pickup
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

// Open booking modal with pre-selected country
function openQuoteModal(countryName, baseRate = 0) {
  const countrySelect = document.getElementById("modalCountrySelect");
  if (countrySelect) {
    countrySelect.value = countryName;
  }
  const modalEl = document.getElementById("quickQuoteModal");
  if (modalEl) {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  } else {
    // If no modal, open WhatsApp directly
    const msg = `Hello Ziva Courier, I want to book an international parcel pickup for *${countryName}* (Base Rate: ₹${baseRate}/kg). Please share details.`;
    window.open(`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(msg)}`, '_blank');
  }
}

// Domestic Destinations Data
const domesticDestinations = [
  { city: "Delhi NCR (Express Next Day)", rate: 90 },
  { city: "Mumbai / Maharashtra", rate: 120 },
  { city: "Bangalore / Karnataka", rate: 140 },
  { city: "Hyderabad / Telangana", rate: 130 },
  { city: "Chennai / Tamil Nadu", rate: 140 },
  { city: "Kolkata / West Bengal", rate: 150 },
  { city: "Ahmedabad / Gujarat", rate: 100 },
  { city: "Pune / Maharashtra", rate: 120 },
  { city: "All India Standard Doorstep", rate: 110 }
];

// Switch Quote Mode between International & Domestic
let currentShipmentMode = "international";

let internationalHtmlCache = "";

function setShipmentMode(mode) {
  currentShipmentMode = mode;
  const intlRadio = document.getElementById("tabIntlRadio");
  const domRadio = document.getElementById("tabDomRadio");
  const intlBtn = document.getElementById("tabIntlBtn");
  const domBtn = document.getElementById("tabDomBtn");
  const labelTo = document.getElementById("toDestLabel");
  const selectTo = document.getElementById("heroDestinationSelect");
  const quoteTitle = document.getElementById("quoteHeaderTitle");

  if (selectTo && !internationalHtmlCache) {
    internationalHtmlCache = selectTo.innerHTML;
  }

  if (intlRadio && domRadio && intlBtn && domBtn) {
    if (mode === "domestic") {
      intlRadio.checked = false;
      domRadio.checked = true;
      intlBtn.classList.remove("active");
      domBtn.classList.add("active");
      if (labelTo) labelTo.textContent = "To State / City (Domestic)";
      if (quoteTitle) quoteTitle.textContent = "Send Courier from Jaipur across India";
      
      // Populate domestic destinations
      if (selectTo) {
        selectTo.innerHTML = `<option value="" selected disabled>Select Domestic Destination</option>`;
        domesticDestinations.forEach(d => {
          selectTo.innerHTML += `<option value="${d.city}" data-rate="${d.rate}">${d.city} (From ₹${d.rate}/kg)</option>`;
        });
      }
    } else {
      intlRadio.checked = true;
      domRadio.checked = false;
      intlBtn.classList.add("active");
      domBtn.classList.remove("active");
      if (labelTo) labelTo.textContent = "To Country";
      if (quoteTitle) quoteTitle.textContent = "Send Courier from Jaipur to Worldwide";
      
      // Restore full international destinations with Popular + A-Z optgroups
      if (selectTo && internationalHtmlCache) {
        selectTo.innerHTML = internationalHtmlCache;
      }
    }
  }
}

// Volumetric Weight Calculator (Standard formula: L x W x H / 5000)
function calculateVolumetric() {
  const widthEl = document.getElementById("volWidth");
  const lengthEl = document.getElementById("volLength");
  const heightEl = document.getElementById("volHeight");
  const resultDisplay = document.getElementById("volResultDisplay");

  const w = parseFloat(widthEl ? widthEl.value : 0) || 0;
  const l = parseFloat(lengthEl ? lengthEl.value : 0) || 0;
  const h = parseFloat(heightEl ? heightEl.value : 0) || 0;

  if (w <= 0 || l <= 0 || h <= 0) {
    if (resultDisplay) {
      resultDisplay.innerHTML = `<span class="text-danger fw-bold">Please enter positive values for Width, Length, and Height (in cm).</span>`;
    }
    return;
  }

  const volumeCm3 = (l * w * h);
  const volWeight = (volumeCm3 / 5000);
  const formattedWeight = volWeight.toFixed(2);

  if (resultDisplay) {
    resultDisplay.innerHTML = `
      <div class="volumetric-result-title">
        <i class="fa-solid fa-box-open me-2"></i> Volumetric Weight: <strong>${formattedWeight} kg</strong>
      </div>
      <div class="volumetric-formula-tag mt-2">
        <span>Volume: ${volumeCm3.toLocaleString()} cm³</span> | 
        <span>Formula: (${l} × ${w} × ${h}) ÷ 5000</span>
      </div>
      <p class="small text-muted mt-2 mb-3">
        *Courier charge is calculated on whichever is higher: Actual Gross Weight vs Volumetric Weight (${formattedWeight} kg).
      </p>
      <button type="button" class="btn btn-sm btn-primary-custom" onclick="applyVolumetricWeightToHero(${formattedWeight})">
        <i class="fa-solid fa-arrow-up-right-from-square me-1"></i> Apply ${formattedWeight} Kg to Rate Calculator
      </button>
    `;
  }
}

// Transfer calculated volumetric weight to hero form & scroll
function applyVolumetricWeightToHero(weightKg) {
  const heroWeightSelect = document.getElementById("heroWeightSelect");
  const heroWeightInput = document.getElementById("heroWeightInput");
  
  if (heroWeightSelect) {
    let closestOpt = heroWeightSelect.options[1];
    for (let i = 1; i < heroWeightSelect.options.length; i++) {
      const optVal = parseFloat(heroWeightSelect.options[i].value);
      if (optVal >= weightKg) {
        closestOpt = heroWeightSelect.options[i];
        break;
      }
      closestOpt = heroWeightSelect.options[i];
    }
    if (closestOpt) {
      heroWeightSelect.value = closestOpt.value;
    }
    heroWeightSelect.scrollIntoView({ behavior: 'smooth', block: 'center' });
    heroWeightSelect.focus();
    heroWeightSelect.style.backgroundColor = '#fef3c7';
    setTimeout(() => { heroWeightSelect.style.backgroundColor = ''; }, 2000);
  } else if (heroWeightInput) {
    heroWeightInput.value = weightKg;
    heroWeightInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    heroWeightInput.focus();
    heroWeightInput.style.backgroundColor = '#fef3c7';
    setTimeout(() => { heroWeightInput.style.backgroundColor = ''; }, 2000);
  }
}

// Instant Corporate Hero Rate Calculator & WhatsApp Direct Connect
function calculateHeroCourierCharges(event) {
  if (event) event.preventDefault();
  
  const form = document.getElementById("corporateHeroForm");
  if (!form) return;

  const destSelect = document.getElementById("heroDestinationSelect");
  const selectedOption = destSelect ? destSelect.options[destSelect.selectedIndex] : null;
  const destination = selectedOption && selectedOption.value ? selectedOption.value : "";
  
  const weightSelect = document.getElementById("heroWeightSelect");
  const weightInput = document.getElementById("heroWeightInput");
  const weight = parseFloat((weightSelect ? weightSelect.value : weightInput?.value) || 0);
  const selectedWeightOpt = weightSelect && weightSelect.selectedIndex > 0 ? weightSelect.options[weightSelect.selectedIndex] : null;
  const weightLabel = selectedWeightOpt ? selectedWeightOpt.text : `${weight} Kg`;
  
  const packageType = form.querySelector('[name="packageType"]')?.value || "Non-Documents / Parcel";
  const mobileInput = form.querySelector('[name="phone"]');
  const mobile = mobileInput ? mobileInput.value.trim() : "";
  const countryCode = form.querySelector('[name="countryCode"]')?.value || "+91";
  const outputBox = document.getElementById("heroQuoteOutput");

  // Validation
  if (!destination) {
    alert("Please select a destination country/state from the list.");
    if (destSelect) destSelect.focus();
    return;
  }

  if (!weight || weight <= 0) {
    alert("Please select shipment weight from the list.");
    if (weightSelect) weightSelect.focus();
    return;
  }

  if (!mobile) {
    alert("Please enter your 10-digit mobile number.");
    if (mobileInput) mobileInput.focus();
    return;
  }

  let baseRate = 0;
  if (currentShipmentMode === "domestic") {
    const domObj = domesticDestinations.find(d => d.city === destination);
    baseRate = domObj ? domObj.rate : 110;
  } else {
    const intlObj = rateCardData.find(c => c.country.toUpperCase() === destination.toUpperCase());
    const dataRate = selectedOption ? parseFloat(selectedOption.getAttribute("data-rate")) : 0;
    baseRate = intlObj ? intlObj.rate : (dataRate || 750);
  }

  // Calculate tier pricing
  let totalCost = 0;
  let discountUnlocked = false;
  let discountAmount = 0;

  if (currentShipmentMode === "domestic") {
    totalCost = Math.max(weight * baseRate, 350);
    if (weight >= 10) {
      discountUnlocked = true;
      discountAmount = 299;
    }
  } else {
    if (weight >= 50) {
      totalCost = weight * baseRate;
    } else if (weight >= 20) {
      totalCost = weight * Math.round(baseRate * 1.15);
    } else {
      totalCost = Math.max(weight * Math.round(baseRate * 1.35), 2200);
    }
    if (weight >= 10) {
      discountUnlocked = true;
      discountAmount = 499;
    }
  }

  const finalPayable = Math.max(totalCost - discountAmount, 0);
  const modeLabel = currentShipmentMode === "domestic" ? "Domestic (Within India)" : "International (Worldwide)";
  const discountNote = discountUnlocked ? ` (₹${discountAmount} Instant Booking Discount Applied)` : "";

  // Prepare full WhatsApp inquiry message with all typed details
  const waMessage = 
`*New Courier Rate & Booking Request - Ziva Courier*
━━━━━━━━━━━━━━━━━━━━━
📍 *Mode:* ${modeLabel}
🌍 *Destination:* ${destination}
📦 *Package Type:* ${packageType}
⚖️ *Weight:* ${weightLabel} (${weight} Kg)
📱 *Customer Mobile:* ${countryCode} ${mobile}
💰 *Estimated Charges:* ₹${finalPayable.toLocaleString('en-IN')}*${discountNote}
━━━━━━━━━━━━━━━━━━━━━
*Pickup Location:* Jaipur / Rajasthan (Free 7-Layer Packing included)
Please confirm rate quote and pickup schedule.`;

  const waUrl = `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(waMessage)}`;

  // Update on-page quote output box
  if (outputBox) {
    outputBox.classList.remove("d-none");
    outputBox.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span class="badge bg-success">${currentShipmentMode.toUpperCase()}: ${destination}</span>
        <span class="text-muted small">${weight} Kg (${packageType})</span>
      </div>
      <div class="price-badge mb-1">
        ₹${finalPayable.toLocaleString('en-IN')}* 
        ${discountUnlocked ? `<small class="text-danger text-decoration-line-through fs-6 ms-1">₹${totalCost.toLocaleString('en-IN')}</small>` : ''}
      </div>
      ${discountUnlocked ? `<div class="small text-success fw-bold"><i class="fa-solid fa-gift"></i> ₹${discountAmount} Instant Booking Discount Applied!</div>` : `<div class="small text-muted"><i class="fa-solid fa-circle-info text-primary"></i> Tip: Send 10kg+ to unlock instant ₹${currentShipmentMode === 'domestic' ? '299' : '499'} off!</div>`}
      <div class="small text-muted mt-1">*Includes Free Doorstep Pickup & 7-Layer Packing in Jaipur.</div>
      <div class="alert alert-success py-2 px-3 mt-3 mb-2 small d-flex align-items-center gap-2">
        <i class="fa-brands fa-whatsapp fs-5 text-success"></i>
        <div>
          <strong>Redirecting to WhatsApp (+91 7300030628)...</strong><br>
          <span class="text-muted">Connecting your inquiry directly with all entered details.</span>
        </div>
      </div>
      <div class="mt-2 d-flex gap-2">
        <a href="${waUrl}" 
           target="_blank" class="btn btn-sm btn-corp-green flex-grow-1">
           <i class="fa-brands fa-whatsapp me-1"></i> Continue on WhatsApp
        </a>
      </div>
    `;
    outputBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Redirect to WhatsApp immediately with all details
  const waWin = window.open(waUrl, '_blank');
  if (!waWin || waWin.closed || typeof waWin.closed === 'undefined') {
    // Fallback if popup blocker intercepted new window
    window.location.href = waUrl;
  }
}

// Calculate rate estimation for rate page
function calculateEstimate() {
  const country = document.getElementById("calcCountry") ? document.getElementById("calcCountry").value : "";
  const weight = parseFloat(document.getElementById("calcWeight") ? document.getElementById("calcWeight").value : 0);
  const resultDiv = document.getElementById("calcResult");

  if (!country || !weight || weight <= 0) {
    if (resultDiv) {
      resultDiv.innerHTML = `<div class="alert alert-warning py-2 mb-0">Please select a destination country and enter valid shipment weight.</div>`;
      resultDiv.classList.remove("d-none");
    }
    return;
  }

  const selectedData = rateCardData.find(c => c.country.toLowerCase() === country.toLowerCase());
  let ratePerKg = selectedData ? selectedData.rate : 850;

  // Tier pricing adjustments
  let estimatedTotal = 0;
  let pricingNote = "";

  if (weight >= 50) {
    estimatedTotal = weight * ratePerKg;
    pricingNote = `Bulk Special Rate Applied (₹${ratePerKg}/Kg)`;
  } else if (weight >= 20) {
    const mediumTierRate = Math.round(ratePerKg * 1.15);
    estimatedTotal = weight * mediumTierRate;
    pricingNote = `Standard Air Tier (₹${mediumTierRate}/Kg for 20-49 Kg)`;
  } else {
    const retailTierRate = Math.round(ratePerKg * 1.35);
    estimatedTotal = Math.max(weight * retailTierRate, 2200);
    pricingNote = `Express Courier Tier (Min booking charges apply)`;
  }

  if (resultDiv) {
    resultDiv.classList.remove("d-none");
    resultDiv.innerHTML = `
      <div class="calc-result-box">
        <span class="badge bg-primary mb-2">${country.toUpperCase()} EXPRESS COURIER</span>
        <div class="text-muted small">Estimated Door-to-Door Shipping Cost:</div>
        <div class="estimated-price">₹${estimatedTotal.toLocaleString('en-IN')}*</div>
        <div class="small text-secondary fw-semibold mt-1"><i class="fa-solid fa-circle-check text-success"></i> ${pricingNote}</div>
        <div class="small text-muted mt-1">*Excluding destination customs duties & optional insurance. Free doorstep pickup included in Jaipur.</div>
        <hr class="my-3">
        <a href="https://wa.me/${WHATSAPP_NUM}?text=Hi%20Ziva%20Courier,%20I%20got%20an%20estimate%20for%20${weight}Kg%20shipment%20to%20${country}%20(Estimated%20₹${estimatedTotal}).%20Please%20schedule%20pickup." 
           target="_blank" class="btn btn-secondary-custom w-100">
          <i class="fa-brands fa-whatsapp me-2"></i> Book Doorstep Pickup on WhatsApp
        </a>
      </div>
    `;
  }
}

// Form Submission & WhatsApp Forwarding
function handleInquiryForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = form.querySelector('[name="name"]')?.value || "Customer";
    const phone = form.querySelector('[name="phone"]')?.value || "";
    const country = form.querySelector('[name="country"]')?.value || "International";
    const weight = form.querySelector('[name="weight"]')?.value || "Not specified";
    const itemType = form.querySelector('[name="itemType"]')?.value || "Parcel";
    const message = form.querySelector('[name="message"]')?.value || "";

    const waText = `*New Courier Pickup / Rate Inquiry - Ziva Courier*\n` +
      `👤 *Name:* ${name}\n` +
      `📞 *Phone:* ${phone}\n` +
      `🌍 *Destination Country:* ${country}\n` +
      `⚖️ *Weight:* ${weight} Kg\n` +
      `📦 *Item Type:* ${itemType}\n` +
      (message ? `📝 *Notes:* ${message}\n` : '') +
      `📍 *Pickup Location:* Jaipur / Rajasthan\n` +
      `_Sent via Ziva Courier Website_`;

    window.open(`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(waText)}`, '_blank');
    
    // Show success alert
    alert("Thank you! Your pickup request has been redirected to our WhatsApp desk. We are connecting you now.");
    form.reset();
  });
}

// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  // Render home / rate page cards
  renderRateCards("", "rateCardContainer");
  renderRateCards("", "fullRateCardContainer");

  // Search filter listener
  const searchInput = document.getElementById("rateSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", function (e) {
      renderRateCards(e.target.value, "rateCardContainer");
      renderRateCards(e.target.value, "fullRateCardContainer");
    });
  }

  // Populate Country Dropdowns
  const countrySelects = document.querySelectorAll(".country-select-populate");
  countrySelects.forEach(select => {
    rateCardData.forEach(item => {
      const opt = document.createElement("option");
      opt.value = item.country;
      opt.textContent = `${item.country} (Starting ₹${item.rate}/Kg)`;
      select.appendChild(opt);
    });
  });

  // Setup Domestic / International radio tab listeners
  const intlRadio = document.getElementById("tabIntlRadio");
  const domRadio = document.getElementById("tabDomRadio");
  if (intlRadio) {
    intlRadio.addEventListener("change", () => setShipmentMode("international"));
  }
  if (domRadio) {
    domRadio.addEventListener("change", () => setShipmentMode("domestic"));
  }

  // Setup Hero Corporate Form
  const corpForm = document.getElementById("corporateHeroForm");
  if (corpForm) {
    corpForm.addEventListener("submit", calculateHeroCourierCharges);
  }

  // Volumetric inputs live calculator
  ["volWidth", "volLength", "volHeight"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", calculateVolumetric);
    }
  });

  // Attach inquiry handlers
  handleInquiryForm("heroQuoteForm");
  handleInquiryForm("modalQuoteForm");
  handleInquiryForm("contactPageForm");
  handleInquiryForm("ratesQuoteForm");
});

