import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import {join} from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(express.json());

/**
 * Enterprise API endpoints
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    enterprise: 'PEACHY HOLDING ENTERPRISE',
    timestamp: new Date().toISOString()
  });
});

// Stripe Checkout Payment Intent endpoint
app.post('/api/checkout/stripe-intent', (req, res) => {
  const { amount, currency = 'usd' } = req.body;
  
  if (!amount || amount <= 0) {
    res.status(400).json({ error: 'Valid transaction amount required.' });
    return;
  }

  // Simulated / Configured Stripe Client Secret Response
  const mockIntentId = 'pi_peachy_' + Math.random().toString(36).substring(2, 15);
  const clientSecret = `${mockIntentId}_secret_${Math.random().toString(36).substring(2, 10)}`;

  res.json({
    clientSecret,
    paymentIntentId: mockIntentId,
    amount,
    currency,
    status: 'requires_payment_method',
    provider: 'Stripe Luxury Escrow',
    note: 'In production, initialize with STRIPE_SECRET_KEY in server environment.'
  });
  return;
});

// Logistics Tracking API
app.get('/api/shipments/track/:id', (req, res) => {
  const trackingNumber = req.params.id?.toUpperCase();
  const sampleMap: Record<string, { trackingNumber: string; status: string; origin: string; destination: string; service: string }> = {
    'PHE-8827-010': {
      trackingNumber: 'PHE-8827-010',
      status: 'In transit',
      origin: 'Zurich (ZRH)',
      destination: 'Umuahia, Abia State',
      service: 'Armored High-Value Priority Air'
    },
    'PHE-4391-772': {
      trackingNumber: 'PHE-4391-772',
      status: 'At distribution centre',
      origin: 'Frankfurt, Germany',
      destination: 'Lagos, Nigeria',
      service: 'Corporate Express Air Courier'
    }
  };

  if (trackingNumber && sampleMap[trackingNumber]) {
    res.json(sampleMap[trackingNumber]);
    return;
  } else {
    res.status(404).json({ error: 'Consignment record not found.' });
    return;
  }
});


/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
