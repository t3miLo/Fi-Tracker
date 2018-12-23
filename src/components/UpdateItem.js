import React, { Component } from 'react'

export default class UpdateItem extends Component {
  render() {
   const item = this.props.item
    return (
      <form action="">
        <div className='form-group'>
          <label htmlFor="itemType">Type: </label>
          <input type="text" name="itemType" id="itemType" value={item.type}/>
        </div>
        <div className='form-group'>
          <label htmlFor="totalAmount">Total Due: </label>
          <input type="text" name="totalAmount" id="TotalAmount" value={item.totalAmount}/>
        </div>
        <div className='form-group'>
          <label htmlFor="interest">Interest: </label>
          <input type="text" name="interest" id="interest" value={item.interest}/>
        </div>
        <div className='form-group'>
          <label htmlFor="payment">Payments: </label>
          <input type="text" name="payment" id="payment" value={item.payment}/>
        </div>
      </form>
    )
  }
}
