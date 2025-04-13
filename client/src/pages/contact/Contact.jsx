// import React, { useRef, useState } from "react";
// import { Header } from "../../components";
// import { CiPhone } from "react-icons/ci";
// import { AiOutlineMail, AiOutlineTwitter } from "react-icons/ai";
// import emailjs from "@emailjs/browser";
// import { toast } from "react-toastify";

// const Contact = () => {
//    const formRef = useRef();
//    const [loading, setLoading] = useState(true);

//    const sendEmail = (e) => {
//       e.preventDefault();
//       setLoading(true);
//       emailjs
//          .sendForm(
//             "service_rn5uwdh",
//             "template_z55djla",
//             formRef.current,
//             "onCf_FZuuuG_27Kb_"
//          )
//          .then(
//             (result) => {
//                console.log(result.text);
//                toast.success("Feedback Recorded. We will Contact you shortly");
//             },
//             (error) => {
//                console.log(error.text);
//                toast.error("Something went Wrong , Please try again later");
//             }
//          );
//       setLoading(false);
//       e.target.reset(); // clear input fields
//    };

//    return (
//       <>
//          <Header text="Contact Us" />
//          <main className="w-full mx-auto px-2 lg:w-9/12 md:px-6 mt-4 lg:mt-6 flex flex-col md:flex-row justify-between gap-10">
//             <section className="w-full md:w-[30rem] bg-primary-content rounded-md p-6 h-72">
//                {/* Card */}
//                <div className="mb-10">
//                   <h1 className="text-xl md:text-3xl mb-2">
//                      Contact Information
//                   </h1>
//                   <p className="md:text-lg">
//                      Fill the form or contact us via other channels
//                   </p>
//                </div>
//                <div>
//                   <div className="flex items-center gap-2 my-2 md:text-xl">
//                      <AiOutlineMail />
//                      <a href="mailto: arunmuruka@gmail.com?subject=Feedback&body=message">
//                         Support@appliances.com
//                      </a>
//                   </div>
//                   <div className="flex items-center gap-2  my-2 md:text-xl">
//                      <CiPhone />
//                      <a href="tel:+91-123-12345">91-123-12345</a>
//                   </div>
//                   <div className="flex items-center gap-2 md:text-xl  my-2">
//                      <AiOutlineTwitter />
//                      <a
//                         href="https://twitter.com/"
//                         rel="noreferrer"
//                         target="_blank"
//                      >
                
//                      </a>
//                   </div>
//                </div>
//             </section>
//             <section className="w-full md:w-2/3 rounded-md shadow-lg border-2 p-6">
//                {/* Form */}
//                <h1 className="text-xl md:text-3xl">Contact Us</h1>
//                <form
//                   className="form-control"
//                   onSubmit={sendEmail}
//                   ref={formRef}
//                >
//                   <div className="py-2">
//                      <label className="label-text md:font-semibold mb-2 block text-lg">
//                         Name :
//                      </label>
//                      <input
//                         className="input input-bordered max-w-lg w-full border-2"
//                         type="text"
//                         placeholder="Full Name"
//                         required
//                         name="username"
//                      />
//                   </div>
//                   <div className="py-2">
//                      <label className="label-text md:font-semibold mb-2 block text-lg">
//                         Email :
//                      </label>
//                      <input
//                         className="input input-bordered max-w-lg w-full border-2"
//                         type="email"
//                         placeholder="Active Email"
//                         required
//                         name="email"
//                      />
//                   </div>
//                   <div className="py-2">
//                      <label className="label-text md:font-semibold mb-2 block text-lg">
//                         Subject :
//                      </label>
//                      <input
//                         className="input input-bordered max-w-lg w-full border-2"
//                         type="text"
//                         placeholder="Subject"
//                         required
//                         name="subject"
//                      />
//                   </div>
//                   <div className="py-2">
//                      <label className="label-text md:font-semibold mb-2 block text-lg">
//                         Message :
//                      </label>
//                      <textarea
//                         className="textarea textarea-bordered max-w-[100%] w-full"
//                         rows={5}
//                         required
//                         name="message"
//                      ></textarea>
//                   </div>
//                   <button className="btn max-w-xs w-full" type="submit">
//                      Send Message
//                   </button>
//                </form>
//             </section>
//          </main>
//       </>
//    );
// };

// export default Contact;
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { FiPhone, FiMail, FiMapPin, FiClock, FiMessageSquare, FiUser } from "react-icons/fi";

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Using the original EmailJS configuration
    emailjs
      .sendForm(
        "service_rn5uwdh",
        "template_z55djla",
        formRef.current,
        "onCf_FZuuuG_27Kb_"
      )
      .then(
        (result) => {
          toast.success("Feedback recorded. We will contact you shortly.");
        },
        (error) => {
          toast.error("Something went wrong. Please try again later.");
        }
      )
      .finally(() => {
        setLoading(false);
        e.target.reset();
        setFormData({
          username: "",
          email: "",
          subject: "",
          message: ""
        });
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Get in Touch
        </h1>
        <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
          We'd love to hear from you! Reach out to us with any questions about our products or services.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Information */}
        <div className="col-span-1 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-blue-600 p-6">
            <h2 className="text-2xl font-bold text-white">Contact Information</h2>
            <p className="mt-2 text-blue-100">
              We'd love to hear from you! Reach out to us through the following:
            </p>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="space-y-4 text-gray-800">
              <p className="text-lg font-medium">Erode Direct</p>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FiPhone className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-base font-medium text-gray-900">Phone</p>
                <a href="tel:+916374975557" className="mt-1 text-base text-gray-600 hover:text-blue-600 transition">+91 63749 75557</a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FiMail className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-base font-medium text-gray-900">Email</p>
                <a href="mailto:erodedirect@gmail.com" className="mt-1 text-base text-gray-600 hover:text-blue-600 transition">erodedirect@gmail.com</a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FiMapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-base font-medium text-gray-900">Location</p>
                <p className="mt-1 text-base text-gray-600">
                Erode Fort 61/61a,Mettur Road, Opposite Abirami Theatre Road, Ajantha International Building,Tamilnadu,638011, Erode, Tamil Nadu 638001
                </p>
              </div>
            </div>
          </div>

          {/* Store hours section */}
          <div className="px-6 pb-6 border-t border-gray-200 pt-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FiClock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-base font-medium text-gray-900">Business Hours</p>
                <p className="mt-1 text-base text-gray-600">
                  Monday - Saturday: 9AM to 7PM<br />
                  Sunday: 10AM to 5PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="col-span-1 lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            
            <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-3"
                  placeholder="Subject of your message"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute top-3 left-3 flex items-center pointer-events-none">
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    required
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  ></textarea>
                </div>
              </div>

              {/* Order-related section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Having issues with your order?</h3>
                <p className="text-sm text-gray-500">
                  Please include your order number in your message for faster assistance with order-related inquiries.
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 ${
                    loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-12 bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-900">Find Us</h2>
          <p className="mt-2 text-gray-600">Visit our store to experience our products in person</p>
        </div>
        <div className="h-96 w-full">
          <iframe
            title="Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1955.9298319688373!2d77.71673328883699!3d11.344959355578327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96fa360d25ec3%3A0x26a18a275a34a082!2sErode%20Direct!5e0!3m2!1sen!2sin!4v1744482293080!5m2!1sen!2sin"

            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;