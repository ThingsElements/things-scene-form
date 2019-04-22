var soap = require('soap')
var url = './sample.wsdl'

var args = { I_GSTRP: '2019.04.11', I_MATNR: '2011846' }

soap.createClient(url, function(err, client) {
  client.Z_PP_ORDER_STATUS_OUTOP(args, function(err, result) {
    console.log(args, result)
  })
})
