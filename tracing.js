// Referred to and referencing the Observsability Assignment PDF's code instructed to create in tracing.js file
const { resourceFromAttributes } = require('@opentelemetry/resources');
const { ATTR_SERVICE_NAME } = require('@opentelemetry/semantic-conventions');

const { NodeSDK } = require('@opentelemetry/sdk-node');

const {
    getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');
const {
    ConsoleMetricExporter,
    PeriodicExportingMetricReader,
} = require('@opentelemetry/sdk-metrics');

const { ExpressInstrumentation } = require("opentelemetry-instrumentation-express");
const { MongoDBInstrumentation } = require("@opentelemetry/instrumentation-mongodb");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");

const sdk = new NodeSDK({
    resource: resourceFromAttributes({
        [ATTR_SERVICE_NAME]: "todo-service"
    }),
    traceExporter: new ConsoleSpanExporter(),
    metricReader: new PeriodicExportingMetricReader({
        exporter: new ConsoleMetricExporter(),
    }),
    instrumentations: [
        getNodeAutoInstrumentations(),
        new ExpressInstrumentation(),
        new MongoDBInstrumentation(),
        new HttpInstrumentation()],
});

sdk.start();





