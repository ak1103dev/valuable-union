import pika
import json

def send(method, data):
  connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq'))
  channel = connection.channel()

  exchange_name = 'app'
  routing_key = method

  channel.exchange_declare(exchange=exchange_name, exchange_type='topic', durable=True)

  channel.basic_publish(
    exchange=exchange_name,
    routing_key=routing_key,
    body=json.dumps(data),
    properties=pika.BasicProperties(delivery_mode = 2)
  )
  print("%r sent to exchange %r with data: %r" % (routing_key, exchange_name, data))
  connection.close()
