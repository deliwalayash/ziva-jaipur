/**
 * Ziva Courier & Cargo - Main JavaScript
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

// Calculate rate estimation
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
    estimatedTotal = Math.max(weight * retailTierRate, 2200); // Minimum parcel charge
    pricingNote = `Express Courier Tier (Min booking charges apply)`;
  }

  if (resultDiv) {
    resultDiv.classList.remove("d-none");
    resultDiv.innerHTML = `
      <div class="calc-result-box">
        <span class="badge bg-primary mb-2">${country.toUpperCase()} EXPRESS CARGO</span>
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

  // Attach inquiry handlers
  handleInquiryForm("heroQuoteForm");
  handleInquiryForm("modalQuoteForm");
  handleInquiryForm("contactPageForm");
  handleInquiryForm("ratesQuoteForm");
});
