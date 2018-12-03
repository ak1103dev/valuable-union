const amqp = require('amqplib/callback_api');

const exchangeName = 'app'
const bindingKey = 'user.*'

const send = () => {}

const receive = (services) =>
  amqp.connect('amqp://rabbitmq', function(err, conn) {
    conn.createChannel(function(err, ch) {

      ch.assertExchange(exchangeName, 'topic', {durable: true});

      ch.assertQueue('', {exclusive: true}, function(err, q) {
        console.log(' [*] Waiting for logs. To exit press CTRL+C');

        ch.bindQueue(q.queue, exchangeName, bindingKey);

        ch.consume(q.queue, function(msg) {
          const method = msg.fields.routingKey.split('.')[1]
          const data = msg.content

          services[method](data)

          console.log(" [x] %s:'%s'", method, body);
        }, {noAck: true});
      });
    });
  });

exports.send = send
exports.receive = receive
