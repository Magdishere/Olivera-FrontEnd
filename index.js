// Base API URL
const API = 'https://olivera-backend-s5ul.onrender.com';

/* ========================= FEATURES ========================= */
function Handle_Features() {
    const _featuresContainer = document.getElementById('Features');
    if (!_featuresContainer) return;

    fetch(`${API}/features`)
        .then(res => res.json())
        .then(features => {
            _featuresContainer.innerHTML = ''; // Clear old content

            features.forEach(feature => {
                const featureHTML = `
                    <i class="${feature.icon}"></i>
                    <h4><a href="#" class="stretched-link">${feature.title}</a></h4>
                    <p>${feature.description}</p>
                `;

                const featureDiv = document.createElement('div');
                featureDiv.className = 'col-md-6 icon-box position-relative';
                featureDiv.innerHTML = featureHTML;

                _featuresContainer.appendChild(featureDiv);
            });
        })
        .catch(err => console.error('Error loading features:', err));
}

/* ========================= SERVICES ========================= */
function Handle_Services() {
    const _servicesContainer = document.getElementById('Services');
    if (!_servicesContainer) return;

    fetch(`${API}/services`)
        .then(res => res.json())
        .then(services => {
            _servicesContainer.innerHTML = ''; // Clear old content

            services.forEach((service, index) => {
                const serviceHTML = `
                    <div class="icon flex-shrink-0"><i class="${service.icon}"></i></div>
                    <div>
                        <h4 class="title">
                            <a href="service-details.html" class="stretched-link">${service.title}</a>
                        </h4>
                        <p class="description">${service.description}</p>
                    </div>
                `;

                const serviceDiv = document.createElement('div');
                serviceDiv.className = 'col-lg-4 col-md-6 service-item d-flex';
                serviceDiv.setAttribute('data-aos', 'fade-up');
                serviceDiv.setAttribute('data-aos-delay', service.delay || 100);
                serviceDiv.innerHTML = serviceHTML;

                _servicesContainer.appendChild(serviceDiv);
            });
        })
        .catch(err => console.error('Error loading services:', err));
}

/* ========================= PRICING ========================= */
function Handle_Pricing() {
    const _pricingContainer = document.querySelector('#pricing .row');
    if (!_pricingContainer) return;

    fetch(`${API}/pricing`)
        .then(res => res.json())
        .then(plans => {
            _pricingContainer.innerHTML = ''; // Clear old content

            plans.forEach((plan, index) => {
                // Build features list
                let featuresHTML = '';
                if (plan.features && plan.features.length > 0) {
                    featuresHTML = `
                        <ul>
                            ${plan.features.map(f => `<li><i class="bi bi-check"></i> <span>${f}</span></li>`).join('')}
                        </ul>
                    `;
                }

                const planHTML = `
                    ${plan.featured ? `<p class="popular">${plan.label || 'Special Offer'}</p>` : ''}
                    <h3>${plan.name}</h3>
                    <p class="description">${plan.description}</p>
                    <h4><sup>$</sup>${plan.price}<span> / ${plan.unit}</span></h4>
                    ${featuresHTML}
                    <a href="${plan.cta_link || '#'}" class="cta-btn">
                        ${plan.cta_text || 'Buy Now'}
                    </a>
                `;

                const planDiv = document.createElement('div');
                planDiv.className = 'col-lg-4';
                planDiv.setAttribute('data-aos', 'zoom-in');
                planDiv.setAttribute('data-aos-delay', 100 * (index + 1));
                planDiv.innerHTML = `<div class="pricing-item ${plan.featured ? 'featured' : ''}">${planHTML}</div>`;

                _pricingContainer.appendChild(planDiv);
            });
        })
        .catch(err => console.error('Error loading pricing:', err));
}

/* ========================= INIT ========================= */
document.addEventListener('DOMContentLoaded', () => {
    Handle_Features();
    Handle_Services();
    Handle_Pricing();
});
