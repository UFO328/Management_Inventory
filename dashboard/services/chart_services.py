from django.db.models import Count
from django.db.models.functions import TruncDate
from ..models import Transaction
import json


class AnalyticServices:
  
  @classmethod
  def transaction_per_day(cls):
    qs = (
      Transaction.objects.annotate(day=TruncDate('date')
      ).values('day').annotate(total=Count('id')).order_by('day')
    )
    labels = []
    data = []
      
    for item in qs:
      labels.append(item['day'].strftime('%Y-%m-%d'))
      data.append(item['total'])
    return {'labels':json.dumps(labels),'data':json.dumps(data)}
  
  @classmethod
  def transaction_per_type(cls,type=None):
    qs = (Transaction.objects.all())
    
    if type:
      qs = (qs.filter(type=type))
    qs = (qs.values('type').annotate(total=Count('id')))
    
    labels = []
    data = []
    for types in qs:
      labels.append(types['type'])
      data.append(types['total'])
    return {'labels':json.dumps(labels),'data':json.dumps(data)}
      
  