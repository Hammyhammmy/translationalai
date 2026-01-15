document.addEventListener('DOMContentLoaded', function () {
    fetch('contacts.json')
        .then(response => response.json())
        .then(data => {

            // 1. HYDRATION: Update any hardcoded text fields (mainly for index.html)
            const updateElements = (className, value) => {
                const elements = document.querySelectorAll('.' + className);
                elements.forEach(el => {
                    el.textContent = value;
                });
            };
            updateElements('clinic-fax', data.fax);
            updateElements('clinic-phone', data.phone);
            updateElements('clinic-email', data.advice_email);
            updateElements('clinic-address', data.address);

            // 2. WIDGET INJECTION: Inject the standardized contact box into sub-pages
            const widgetContainers = document.querySelectorAll('.referral-widget-container');
            widgetContainers.forEach(container => {
                container.innerHTML = `
                    <div style="margin-top: 1.5rem; background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; display: inline-block;">
                        <p style="font-size: 1.2rem; margin-bottom: 0.5rem;"><strong>Fax Referral to: <span class="clinic-fax">${data.fax}</span></strong></p>
                        <div style="margin-top: 1rem; font-size: 0.95rem; opacity: 0.9;">
                            Physician Questions? <a href="#" class="clinic-email-link" style="color: var(--white); text-decoration: underline;">MD Advice (No PHI)</a>
                        </div>
                    </div>
                `;
            });

            // 3. ADVICE MODAL: Inject Modal HTML and CSS
            const modalHtml = `
                <div id="adviceModal" style="display:none; position: fixed; z-index: 1000; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0,0,0,0.5); backdrop-filter: blur(2px);">
                    <div style="background-color: #fefefe; margin: 10% auto; padding: 0; border: 1px solid #888; width: 90%; max-width: 600px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.2); font-family: 'Open Sans', sans-serif;">
                        <div style="padding: 1.5rem; background: var(--primary); color: white; border-radius: 8px 8px 0 0;">
                            <h2 style="margin: 0; font-family: 'Merriweather', serif; font-size: 1.5rem;">Physician Advice Line</h2>
                        </div>
                        <div style="padding: 2rem;">
                            <p style="font-size: 1.1rem; margin-bottom: 1.5rem; color: var(--text-dark);">
                                <strong>Direct Access to Urology Triage.</strong><br>
                                Use this secure channel to consult with our team before sending a patient. We have <strong>dedicated office staff</strong> to provide you with guidance.
                            </p>
                            
                            <div style="background: var(--bg-blue-lighter); padding: 1.5rem; border-radius: 6px; margin-bottom: 1.5rem;">
                                <h4 style="margin-top: 0; color: var(--primary);">What we can provide:</h4>
                                <ul style="margin-bottom: 0; padding-left: 1.2rem;">
                                    <li>Estimated wait times for specific procedures.</li>
                                    <li>Guidance on appropriate referral pathways.</li>
                                    <li>Feedback on "Red Flag" symptoms requiring ER.</li>
                                </ul>
                            </div>

                            <div style="border-left: 4px solid #d9534f; padding-left: 1rem; margin-bottom: 2rem;">
                                <h4 style="margin-top: 0; color: #d9534f;">Strict Privacy Protocol</h4>
                                <p style="margin-bottom: 0; font-size: 0.95rem;">
                                    <strong>Absolutely NO identifying information.</strong><br>
                                    Do NOT include Patient Name, DOB, or OHIP (Health Card #).<br><br>
                                    You CAN provide general case information (e.g., "72M with PSA 8.5, normal DRE"), and we will provide an automated estimate on wait times and next steps.
                                </p>
                            </div>

                            <div style="text-align: right;">
                                <button id="closeModal" style="background: none; border: 1px solid var(--text-gray); padding: 0.75rem 1.5rem; border-radius: 4px; cursor: pointer; margin-right: 1rem; font-size: 1rem;">Cancel</button>
                                <a id="confirmEmail" href="#" style="background: var(--primary); color: white; padding: 0.75rem 1.5rem; border-radius: 4px; text-decoration: none; font-weight: 600; display: inline-block;">I Understand - Compose Email</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHtml);

            // 4. EVENT HANDLERS
            const modal = document.getElementById('adviceModal');
            const closeBtn = document.getElementById('closeModal');
            const confirmBtn = document.getElementById('confirmEmail');

            // Prepare mailto link
            const subject = "Physician Advice Request - Ref# [Insert #]";
            const body = "PRIVACY REMINDER: Do NOT include Patient Name, DOB, or OHIP.\n\nPhysician Name:\nLicense/Billing #:\n\nGeneral Case Description (e.g., '72M, PSA 8.5, normal DRE'):\n\nQuestion regarding pathway/timelines:\n";
            const mailtoLink = `mailto:${data.advice_email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            confirmBtn.href = mailtoLink;

            // Attach click listeners to all advice links
            const emailLinks = document.querySelectorAll('.clinic-email-link');
            emailLinks.forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    modal.style.display = "block";
                });
            });

            // Close modal logic
            closeBtn.onclick = function () {
                modal.style.display = "none";
            }
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        })
        .catch(console.error);
});
