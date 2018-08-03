export default[// { label: '$0 - $50', value: '50', search: '0 TO 50', voucher: 50, toast: 'Somebody\'s getting spoilt!' },
  // { label: '$50 - $125', value: '125', search: '50 TO 125', voucher: 100, toast: 'Somebody\'s getting spoilt!' },
  {
    label: '$0 - $125',
    value: '125',
    search: '0 TO 125',
    voucher: 100,
    toast: 'Somebody\'s getting spoilt!',
    toast: 'Somebody\'s getting spoilt!',
    tracking: {
      name: '$100 Gift Voucher',
      price: '100',
      productCode: 'GC0100',
      friendlyURL: 'gift-vouchers/100-gift-certificate',
      primaryCategories: {
        primary: [
          {
            cat: 'Gift Vouchers',
            subcat: 'Gift Vouchers > Gift Certificate'
          }
        ]
      }
    }
  }, {
    label : '$125 - $250',
    value: '250',
    search: '125 TO 250',
    voucher: 250,
    toast: 'Somebody\'s getting spoilt!',
    tracking: {
      name: '$250 Gift Voucher',
      price: '250',
      productCode: 'GC0250',
      friendlyURL: 'gift-vouchers/250-gift-certificate',
      primaryCategories: {
        primary: [
          {
            cat: 'Gift Vouchers',
            subcat: 'Gift Vouchers > Gift Certificate'
          }
        ]
      }
    }
  }, {
    label : '$250 +',
    value: 'above-250',
    search: '250 TO 1000000000',
    voucher: 350,
    toast: 'Somebody\'s getting spoilt!',
    tracking: {
      name: '$350 Gift Voucher',
      price: '350',
      productCode: 'GC0350',
      friendlyURL: 'gift-vouchers/350-gift-certificate',
      primaryCategories: {
        primary: [
          {
            cat: 'Gift Vouchers',
            subcat: 'Gift Vouchers > Gift Certificate'
          }
        ]
      }
    }
  }
]

export const vouchers = {
  50: 'https://www.redballoon.com.au/product/gift-vouchers/50-gift-certificate',
  250: 'https://www.redballoon.com.au/product/gift-vouchers/250-gift-certificate',
  350: 'https://www.redballoon.com.au/product/gift-vouchers/350-gift-certificate'
};
