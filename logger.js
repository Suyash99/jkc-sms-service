const bunyan = require('bunyan')
const logger = bunyan.createLogger(
    {
        'name': 'JK-sms-Alerting',
        'streams': [{
            'type': 'rotating-file',
            'path': 'runtime.log',
            'period': '1d',   // daily rotation
            'count': 3        // keep 3 back copies
        }]
    }
)

module.exports = logger