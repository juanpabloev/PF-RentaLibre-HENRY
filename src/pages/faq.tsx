function Faq() {
  return (
    <div>
      <section className="relative z-20 overflow-hidden bg-white pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
                <span className="text-primary mb-2 block text-lg font-semibold ">
                  FAQ
                </span>
                <h2 className="text-dark sm:text-4x1 mb-4 text-3xl font-bold md:text-[40px]">
                  Alguna Pregunta? Mira Aqui
                </h2>
                <p className="text-body-color text-base">
                  Aqui respondemos las preguntas frecuentes que los usuarios
                  realizan a nuestro equipo de soporte
                </p>
              </div>
            </div>
          </div>

          {/* PREGUNTAS Y RESPUESTAS */}
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4  ">
              <div className="single-faq mb-8 w-full rounded-lg border border-[#f78010] bg-gray-300 p-4 sm:p-8 lg:px-6 xl:px-8">
                <a className="faq-btn flex w-full text-left">
                  <div className="bg-primary text-primary mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-opacity-5">
                    <svg
                      width="17"
                      height="10"
                      viewBox="0 0 17 10"
                      className="icon fill-current"
                    >
                      <path
                        d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
                        fill="#3056D3"
                        stroke="#3056D3"
                      />
                    </svg>
                  </div>
                  <div className="w-full">
                    <h4 className="text-lg font-semibold text-black">
                      ¿Qué es Rentalibre?
                    </h4>
                  </div>
                </a>
                <div x-show="openFaq1" className="faq-content pl-[62px]">
                  <p className="text-body-color   py-3 text-base leading-relaxed">
                    Rentalibre es una plataforma de alquiler entre particulares
                    o profesionales. Actuamos de intermediarios entre el que
                    ofrece algo y el que busca un artículo concreto para
                    alquilar
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 ">
              <div className="single-faq mb-8 w-full rounded-lg border border-[#f78010] bg-gray-300 p-4 sm:p-8 lg:px-6 xl:px-8">
                <a className="faq-btn flex w-full text-left">
                  <div className="bg-primary text-primary mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-opacity-5">
                    <svg
                      width="17"
                      height="10"
                      viewBox="0 0 17 10"
                      className="icon fill-current"
                    >
                      <path
                        d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
                        fill="#3056D3"
                        stroke="#3056D3"
                      />
                    </svg>
                  </div>
                  <div className="w-full">
                    <h4 className="text-lg font-semibold text-black">
                      ¿Cualquiera puede alquilar cosas a otras personas?
                    </h4>
                  </div>
                </a>
                <div x-show="openFaq1" className="faq-content pl-[62px]">
                  <p className="text-body-color   py-3 text-base leading-relaxed">
                    Sí, cualquiera puede tanto pedir artículos en alquiler, como
                    alquilar los suyos a otras personas.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 ">
              <div className="single-faq mb-8 w-full rounded-lg border border-[#f78010] bg-gray-300 p-4 sm:p-8 lg:px-6 xl:px-8">
                <a className="faq-btn flex w-full text-left">
                  <div className="bg-primary text-primary mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-opacity-5">
                    <svg
                      width="17"
                      height="10"
                      viewBox="0 0 17 10"
                      className="icon fill-current"
                    >
                      <path
                        d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
                        fill="#3056D3"
                        stroke="#3056D3"
                      />
                    </svg>
                  </div>
                  <div className="w-full">
                    <h4 className="text-lg font-semibold text-black">
                      ¿Qué cosas puedo poner en alquiler?
                    </h4>
                  </div>
                </a>
                <div x-show="openFaq1" className="faq-content pl-[62px]">
                  <p className="text-body-color   py-3 text-base leading-relaxed">
                    Puedes poner en alquiler prácticamente cualquier cosa (que
                    sea legal y te pertenezca), desde un kayak hasta un piano. Y
                    también puedes ofrecer servicios, como rutas en kayak o
                    clases de piano.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 ">
              <div className="single-faq mb-8 w-full rounded-lg border border-[#f78010] bg-gray-300 p-4 sm:p-8 lg:px-6 xl:px-8">
                <a className="faq-btn flex w-full text-left">
                  <div className="bg-primary text-primary mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-opacity-5">
                    <svg
                      width="17"
                      height="10"
                      viewBox="0 0 17 10"
                      className="icon fill-current"
                    >
                      <path
                        d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
                        fill="#3056D3"
                        stroke="#3056D3"
                      />
                    </svg>
                  </div>
                  <div className="w-full">
                    <h4 className="text-lg font-semibold text-black">
                      ¿Qué precio debo poner a mis artículos?
                    </h4>
                  </div>
                </a>
                <div x-show="openFaq1" className="faq-content pl-[62px]">
                  <p className="text-body-color   py-3 text-base leading-relaxed">
                    El importe mínimo del alquiler de un artículo es de $100 por
                    día.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 ">
              <div className="single-faq mb-8 w-full rounded-lg border border-[#f78010] bg-gray-300 p-4 sm:p-8 lg:px-6 xl:px-8">
                <a className="faq-btn flex w-full text-left">
                  <div className="bg-primary text-primary mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-opacity-5">
                    <svg
                      width="17"
                      height="10"
                      viewBox="0 0 17 10"
                      className="icon fill-current"
                    >
                      <path
                        d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
                        fill="#3056D3"
                        stroke="#3056D3"
                      />
                    </svg>
                  </div>
                  <div className="w-full">
                    <h4 className="text-lg font-semibold text-black">
                      Puedo alquilar como empresa
                    </h4>
                  </div>
                </a>
                <div x-show="openFaq1" className="faq-content pl-[62px]">
                  <p className="text-body-color   py-3 text-base leading-relaxed">
                    Sí
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 ">
              <div className="single-faq mb-8 w-full rounded-lg border border-[#f78010] bg-gray-300 p-4 sm:p-8 lg:px-6 xl:px-8">
                <a className="faq-btn flex w-full text-left">
                  <div className="bg-primary text-primary mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-opacity-5">
                    <svg
                      width="17"
                      height="10"
                      viewBox="0 0 17 10"
                      className="icon fill-current"
                    >
                      <path
                        d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
                        fill="#3056D3"
                        stroke="#3056D3"
                      />
                    </svg>
                  </div>
                  <div className="w-full">
                    <h4 className="text-lg font-semibold text-black">
                      ¿Por qué es obligatorio ponerle una seña a mi artículo?
                    </h4>
                  </div>
                </a>
                <div x-show="openFaq1" className="faq-content pl-[62px]">
                  <p className="text-body-color   py-3 text-base leading-relaxed">
                    Es obligatorio establecer una seña para todos los artículos
                    que pongas en alquiler, por un mínimo de un porcentaje del
                    valor del artículo, como garantía frente a daños. Cuando se
                    confirma el alquiler no cobramos la seña, sino que le
                    pedimos al banco que la bloquee en la tarjeta de quien ha
                    pedido el alquiler. Si al final del alquiler se devuelve el
                    artículo sin daños, la seña se desbloquea de nuevo a las
                    24h.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Faq;
