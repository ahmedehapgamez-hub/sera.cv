const myWhatsAppNumber = "966579801275"; 
        let currentStep = 0;

        // مصفوفة أسعار العملات
        const priceData = {
            EG: {
                cv: "299 <span>ج.م</span>",
                cl: "200 <span>ج.م</span>",
                port: "600 <span>ج.م</span>"
            },
            SA: {
                cv: "150 <span>ريال</span>",
                cl: "80 <span>ريال</span>",
                port: "400 <span>ريال</span>"
            }
        };

        function updatePricing() {
            const country = document.getElementById('countrySelect').value;
            document.getElementById('cvPrice').innerHTML = priceData[country].cv;
            document.getElementById('clPrice').innerHTML = priceData[country].cl;
            document.getElementById('portPrice').innerHTML = priceData[country].port;
        }

        function openModal(serviceName, priceElementId) {
            const countryText = document.getElementById('countrySelect').options[document.getElementById('countrySelect').selectedIndex].text;
            const priceText = document.getElementById(priceElementId).innerText;

            document.getElementById('orderModal').classList.add('active');
            document.getElementById('modalTitle').innerText = "طلب خدمة: " + serviceName;
            
            document.getElementById('selectedService').value = serviceName;
            document.getElementById('orderPrice').value = priceText;
            document.getElementById('orderCountry').value = countryText;

            document.body.style.overflow = "hidden"; 
            currentStep = 0;
            showStep(currentStep);
        }

        function closeModal() {
            document.getElementById('orderModal').classList.remove('active');
            document.body.style.overflow = "auto";
        }

        // تحكم وعرض الخطوات الديناميكي (Multi-Step Logic)
        function showStep(step) {
            const steps = document.getElementsByClassName("form-step");
            steps[step].classList.add("active");

            if (step === 0) {
                document.getElementById("prevBtn").style.display = "none";
            } else {
                document.getElementById("prevBtn").style.display = "inline-block";
            }

            if (step === (steps.length - 1)) {
                document.getElementById("nextBtn").style.display = "none";
                document.getElementById("submitBtn").style.display = "flex";
            } else {
                document.getElementById("nextBtn").style.display = "flex";
                document.getElementById("submitBtn").style.display = "none";
            }

            updateProgressIndicators(step, steps.length);
        }

        function changeStep(n) {
            const steps = document.getElementsByClassName("form-step");
            
            if (n === 1 && !validateStepInputs()) return;

            steps[currentStep].classList.remove("active");
            currentStep = currentStep + n;

            showStep(currentStep);
        }

        function validateStepInputs() {
            const steps = document.getElementsByClassName("form-step");
            const inputs = steps[currentStep].querySelectorAll("[required]");
            let valid = true;
            
            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    input.reportValidity();
                    valid = false;
                }
            });
            return valid;
        }

        function updateProgressIndicators(step, totalSteps) {
            const percentage = (step / (totalSteps - 1)) * 100;
            document.getElementById("progressLine").style.width = percentage + "%";

            for (let i = 0; i < totalSteps; i++) {
                const indicator = document.getElementById("ind-" + i);
                if (i < step) {
                    indicator.className = "step-indicator completed";
                    indicator.innerHTML = `<i class="fa-solid fa-check"></i>`;
                } else if (i === step) {
                    indicator.className = "step-indicator active";
                    indicator.innerHTML = i + 1;
                } else {
                    indicator.className = "step-indicator";
                    indicator.innerHTML = i + 1;
                }
            }
        }

        function sendToWhatsApp(event) {
            event.preventDefault(); 

            if(!validateStepInputs()) return;

            const service = document.getElementById('selectedService').value;
            const orderPrice = document.getElementById('orderPrice').value;
            const orderCountry = document.getElementById('orderCountry').value;

            const name = document.getElementById('fullName').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const address = document.getElementById('address').value;
            const linkedin = document.getElementById('linkedin').value || 'لا يوجد';
            const objective = document.getElementById('objective').value || 'مرفق مع المراجعة بالطلب';
            const experience = document.getElementById('experience').value || 'لا يوجد خبرات سابقة / خريج جديد';
            const education = document.getElementById('education').value;
            const skills = document.getElementById('skills').value;
            const courses = document.getElementById('courses').value || 'لا يوجد دورات';
            const languages = document.getElementById('languages').value;
            const projects = document.getElementById('projects').value || 'لا يوجد مشاريع';
            const hobbies = document.getElementById('hobbies').value || 'لا يوجد هوايات';

            const textMessage = `👑 *طلب جديد من منصة SERA CV* 👑\n\n` +
                                `🎯 *الخدمة المطلوبة:* ${service}\n` +
                                `🌍 *النطاق الإقليمي:* ${orderCountry}\n` +
                                `💰 *قيمة الباقة المستحقة:* ${orderPrice}\n` +
                                `────────────────────\n` +
                                `📄 *1) البيانات الأساسية للشخص:*\n` +
                                ` 🧑‍💼 الاسم الكامل: ${name}\n` +
                                ` 📞 رقم الجوال: ${phone}\n` +
                                ` ✉️ البريد الإلكتروني: ${email}\n` +
                                ` 📍 عنوان الإقامة: ${address}\n` +
                                ` 🔗 لينك إن: ${linkedin}\n\n` +
                                `🎯 *2) المسمى والهدف المهني:*\n${objective}\n\n` +
                                `💼 *3) السجل الوظيفي والخبرات:*\n${experience}\n\n` +
                                `🎓 *4) التخصص الأكاديمي والتعليم:*\n${education}\n\n` +
                                `⚙️ *5) جرد المهارات والأدوات:*\n${skills}\n\n` +
                                `📚 *6) التدريب والشهادات الفنية:*\n${courses}\n\n` +
                                `🌍 *7) مهارات اللغات الإضافية:*\n${languages}\n\n` +
                                `🚀 *8) المشاريع السابقة للمرشح:*\n${projects}\n\n` +
                                `✨ *9) الهوايات والاهتمامات:*\n${hobbies}\n\n` +
                                `────────────────────\n` +
                                `⏱️ تم استلام طلبك بنجاح وسيتم التواصل معكم `;

            const encodeMessage = encodeURIComponent(textMessage);
            const whatsappURL = `https://wa.me/${myWhatsAppNumber}?text=${encodeMessage}`;

            window.open(whatsappURL, '_blank');
            closeModal();
            document.getElementById('cvForm').reset();
            
            const steps = document.getElementsByClassName("form-step");
            steps[currentStep].classList.remove("active");
            currentStep = 0;
        }

        window.onclick = function(event) {
            const modal = document.getElementById('orderModal');
            if (event.target == modal) {
                closeModal();
            }
        }
        function updatePricing() {
    // جلب القائمة المنسدلة للدول
    const country = document.getElementById("countrySelect").value;

    // جلب عناصر الأسعار من الصفحة باستخدام الـ ID الفريد لكل كارد
    const cvPriceEl = document.getElementById("cvPrice");
    const clPriceEl = document.getElementById("clPrice");
    const portPriceEl = document.getElementById("portPrice");

    if (country === "SA") {
        // --- هنا يمكنك تعديل أسعار السعودية كما تحب ---
        cvPriceEl.innerHTML = `60 بدل <del style="color: rgb(252, 0, 0);">100</del> <span>ر.س</span>`; // سعر السيرة الذاتية بالريال
        clPriceEl.innerHTML = `35 بدل <del style="color: rgb(252, 0, 0);">60</del> <span>ر.س</span>`; // سعر خطاب التغطية بالريال
        portPriceEl.innerHTML = `100 بدل <del style="color: rgb(252, 0, 0);">180</del> <span>ر.س</span>`; // سعر الموقع الشخصي بالريال
    } else {
        // --- أسعار مصر (الافتراضية المكتوبة في الـ HTML) ---
        cvPriceEl.innerHTML = `299 بدل <del style="color: rgb(252, 0, 0);">499</del> <span>ج.م</span>`;
        clPriceEl.innerHTML = `200 بدل <del style="color: rgb(252, 0, 0);">399</del> <span>ج.م</span>`;
        portPriceEl.innerHTML = `600 بدل <del style="color: rgb(252, 0, 0);">899</del> <span>ج.م</span>`;
    }
}