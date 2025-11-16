function Handle_Features() {
    let _features = document.getElementById('Features');


    fetch('http://localhost:3000/features')
        .then((response) => response.json())
        .then((_MyFeatures) => {
            _MyFeatures.forEach((feature) => {
                let _content = ` <i class="${feature.icon}"></i>
                <h4><a href="" class="stretched-link">${feature.title}</a></h4>
                <p>${feature.description}</p>`;

                let _feature = document.createElement('div');
                _feature.className = 'col-md-6 icon-box position-relative';
                _feature.innerHTML = _content;
                _features.appendChild(_feature);
            });
        });
}

// Add Required Features
Handle_Features();

function Handle_Services() {
    let _servicesContainer = document.getElementById('Services');

    fetch('http://localhost:3000/services')
        .then((response) => response.json())
        .then((_MyServices) => {
            _MyServices.forEach((service) => {

                let _content = `
                    <div class="icon flex-shrink-0"><i class="${service.icon}"></i></div>
                    <div>
                        <h4 class="title">
                            <a href="service-details.html" class="stretched-link">${service.title}</a>
                        </h4>
                        <p class="description">${service.description}</p>
                    </div>
                `;

                let _serviceItem = document.createElement('div');
                _serviceItem.className = 'col-lg-4 col-md-6 service-item d-flex';
                _serviceItem.setAttribute('data-aos', 'fade-up');
                _serviceItem.setAttribute('data-aos-delay', service.delay || 100);

                _serviceItem.innerHTML = _content;

                _servicesContainer.appendChild(_serviceItem);
            });
        });
}

// Load services automatically
Handle_Services();

function Handle_Pricing() {
    let _pricingContainer = document.querySelector('#pricing .row');

    fetch('http://localhost:3000/pricing')
        .then(response => response.json())
        .then((_MyPricing) => {
            _pricingContainer.innerHTML = ""; // Clear old content

            _MyPricing.forEach((pricing, index) => {

                // Build features list HTML
                let _featuresHTML = "";
                if (pricing.features && pricing.features.length > 0) {
                    _featuresHTML = `
                        <ul>
                            ${pricing.features.map(f => `<li><i class="bi bi-check"></i> <span>${f}</span></li>`).join('')}
                        </ul>
                    `;
                }

                // Main content
                let _content = `
                    ${pricing.featured ? `<p class="popular">${pricing.label || 'Special Offer'}</p>` : ''}
                    <h3>${pricing.name}</h3>
                    <p class="description">${pricing.description}</p>
                    <h4><sup>$</sup>${pricing.price}<span> / ${pricing.unit}</span></h4>

                    ${_featuresHTML}

                    <a href="${pricing.cta_link || '#'}" class="cta-btn">
                        ${pricing.cta_text || 'Buy Now'}
                    </a>
                `;

                let _pricingItem = document.createElement('div');
                _pricingItem.className = 'col-lg-4';
                _pricingItem.setAttribute('data-aos', 'zoom-in');
                _pricingItem.setAttribute('data-aos-delay', 100 * (index + 1));

                _pricingItem.innerHTML = `
                    <div class="pricing-item ${pricing.featured ? 'featured' : ''}">
                        ${_content}
                    </div>
                `;

                _pricingContainer.appendChild(_pricingItem);
            });
        })
        .catch(err => console.error("Error loading pricing items:", err));
}

Handle_Pricing();

