var Analytics = Parse.Object.extend('Analytics');


function clusterData(data)
{
    
    return data;
    
}


function insightCheckForTopProducts(data)
{
    
    
    
    return;
}


exports.generate = function(req, res) 
{
    var query = new Parse.Query('Analytics');
    query.each(function(stat) {
        
            console.log(stat);

    });
}


/*

Parse.Cloud.beforeSave('Order', function(request, response) {
  for (param in Order.schema) {
    var error = getError(Order.schema[param], param, request.object.get(param))
    if (error) {
      response.error(error);
      return;
    }
  }

  response.success();
});

Order.schema = {
  name: {required: true, min_length: 2, max_length: 100, type: 'string'},
  stripe_token: {required: true, min_length: 2, max_length: 100, type: 'string'},

  address_line_1: {type: 'string'},
  address_line_2: {type: 'string'},
  address_city: {type: 'string'},
  address_state: {type: 'string'},
  address_zip: {type: 'string'},
  address_country: {type: 'string'},
  order: {required: true, getError: orderError, type: 'string'}
}

Order.prototype.calculateAmount = function() {
  var order = JSON.parse(this.get('order'))
    , quantity  = 0
    ;

  for (var i = 0; i < order.length; i++) {
    quantity += order[i].quantity
  }

  return quantity * config.price_per_shirt * 100;
}

exports.Order = Order;

*/