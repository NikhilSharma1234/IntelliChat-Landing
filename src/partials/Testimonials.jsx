import React from 'react';

import Testimonialimg01 from '../images/testimonial-01.jpg';
import Testimonialimg02 from '../images/testimonial-02.jpg';
import Testimonialimg03 from '../images/testimonial-03.jpg';

function Testimonials() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">

          {/* Section header */}
          <div id="testimonials" className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">Don't take our word for it</h2>
            <p className="text-xl text-gray-400">Here are some real customer reviews that highlight what it's like to use IntelliChat in their everyday web browsing</p>
          </div>

          {/* Testimonials */}
          <div className="max-w-sm mx-auto grid gap-8 lg:grid-cols-3 lg:gap-6 items-start lg:max-w-none">

            {/* 1st testimonial */}
            <div className="flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up">
              <div>
                <div className="relative inline-flex flex-col mb-4">
                  <img className="rounded-full" src={Testimonialimg01} width={48} height={48} alt="Testimonial 01" />
                  <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-[#277EFF]" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                  </svg>
                </div>
              </div>
              <blockquote className="text-lg text-gray-400 grow">— IntelliChat lets me quickly get the insights I care about so that I can focus on my productive work. I've had IntelliChat for about 24 hours now and I honestly don't know how I functioned without it before.</blockquote>
              <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                <cite className="text-gray-200 not-italic">Austin Sloane</cite> - <a className="text-[#277EFF] hover:text-gray-200 transition duration-150 ease-in-out" href="https://www.linkedin.com/in/sloaneat">TechWise</a>
              </div>
            </div>

            {/* 2nd testimonial */}
            <div className="flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up" data-aos-delay="200">
              <div>
                <div className="relative inline-flex flex-col mb-4">
                  <img className="rounded-full" src={Testimonialimg02} width={48} height={48} alt="Testimonial 02" />
                  <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-[#277EFF]" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                  </svg>
                </div>
              </div>
              <blockquote className="text-lg text-gray-400 grow">— IntelliChat lets me be soooo much more productive. Instead of opening another tab and searching google for something, I can learn about topics on the page, get this --- right on the page</blockquote>
              <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                <cite className="text-gray-200 not-italic">Felipe Rivera</cite> - <a className="text-[#277EFF] hover:text-gray-200 transition duration-150 ease-in-out" href="https://www.linkedin.com/in/feliperiverach">The Rivera</a>
              </div>
            </div>

            {/* 3rd testimonial */}
            <div className="flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up" data-aos-delay="400">
              <div>
                <div className="relative inline-flex flex-col mb-4">
                  <img className="rounded-full" src={Testimonialimg03} width={48} height={48} alt="Testimonial 03" />
                  <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-[#277EFF]" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                  </svg>
                </div>
              </div>
              <blockquote className="text-lg text-gray-400 grow">— This is a great product if you're looking to level up your browsing. The team of engineers keep the extension very updated with new features every few weeks. I love IntelliChat!</blockquote>
              <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                <cite className="text-gray-200 not-italic">Nicholas Groesch</cite> - <a className="text-[#277EFF] hover:text-gray-200 transition duration-150 ease-in-out" href="https://www.linkedin.com/in/nick-groesch-b59806185?challengeId=AQG9cB8brgepdAAAAYnNb4OzajxxkPaxUjZOMJi3tyALvciKzROYuijIcqEi51dWxi4YaPJYKO2z7SyNSo6QSdPqcFx7dkQLAg&submissionId=59e67ec0-f2f2-7817-02c0-7c9d0fe69078&challengeSource=AgEzDpYzc6QbKAAAAYnNb7p51CBJOPY99_wiJMM6I_7IqdBCU2lTI4rtHdQFoWA&challegeType=AgGQtMMJUxbODwAAAYnNb7p8tGBxoLR1MaSQfQPwqjrvxRm_B9o0fyY&memberId=AgHR_73JJ__VQQAAAYnNb7p_Gbp5L1zrecbClkcgCf-3mWg&recognizeDevice=AgHExk1Jk-NNJAAAAYnNb7qCobvTCJJtnX-d8cG0EOAfBIjnNk2I">TalentSprint</a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Testimonials;
