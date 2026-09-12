export default function RescueCase() {
  return (
    <section className="rescue-case" aria-label="Caso de reintentos de pago">
      <span className="eyebrow">UN PROBLEMA · UNA DECISIÓN · UNA PRUEBA</span>
      <h3>Dos peticiones. Un solo pago.</h3>
      <p>
        Envías un pago, la respuesta tarda y vuelves a intentarlo. ¿Cómo evita
        el backend que ese reintento repita el cobro?
      </p>
      <div className="rescue-comparison">
        <div>
          <strong>01 · Antes</strong>
          <p>Repetir la petición podía repetir el cobro simulado.</p>
        </div>
        <div>
          <strong>02 · Después</strong>
          <p>
            La misma operación, con la misma clave, recupera el pago existente
            sin volver a llamar al proveedor.
          </p>
        </div>
      </div>
      <details>
        <summary>Ver la decisión técnica</summary>
        <p>
          Cada operación lleva una clave de idempotencia: un identificador que
          permite reconocer sus reintentos. No basta con desactivar el botón del
          navegador; el servidor debe controlar las peticiones repetidas.
        </p>
        <p>
          La clave no sirve para cualquier pago: reutilizarla para otro pedido
          se rechaza con un conflicto.
        </p>
      </details>
      <details>
        <summary>Qué comprueba el test</summary>
        <ul>
          <li>Primera petición: pago creado, respuesta 201.</li>
          <li>Reintento: respuesta 200 con el mismo identificador de pago.</li>
          <li>Un pago guardado y una sola llamada al proveedor simulado.</li>
        </ul>
        <a
          href="https://github.com/Cansynku/spring-backend-rescue-lab/blob/main/src/test/java/dev/javiercano/backendrescue/PaymentReliabilityTest.java"
          target="_blank"
          rel="noopener noreferrer"
        >
          Revisar la prueba en GitHub ↗
        </a>
      </details>
      <p className="project-limit">
        Caso educativo con proveedor simulado. Esta explicación no ejecuta pagos
        ni demuestra una integración bancaria en producción.
      </p>
    </section>
  );
}
