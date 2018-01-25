//TODO
// If I want to create a cancel button (that resets the form)
// Should I create an action and dispatcher to do this?

import React, {Component} from 'react';
// Form component is a react component that is wired up
// automatically to redux-form
// reduxForm is a function that is very similar to connect
// that is from react-redux
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {createPost} from '../actions'

class PostsNew extends Component {

  // 1) field argument is so that the Field tag in the render method
  // to be able to handle the jsx
  // 2) field.input contains event handlers and props (like onchange, onblur, onfocus)
  // by using ... we are saying we want everything communicated as props to the input tag
  // 3) Able to pass the label tag to the renderField function
  // and use that as the label in the renderField jsx
  // 4) field object represents a input (single piece of state)
  // can be given properties like label below
  // gets automatically created properties like .input
  // 5) .meta is automatically added to our field object by the validate function
  renderField(field) {

    const {meta: {touched, error}} = field;
    // Could also do the below instead of having the above syntax
    // const {touched, error} = meta;
    const className=`form-group ${touched && error ? 'has-danger' : ''}`

    return(
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    // this === component
    console.log(values);
    // This is available because we are using <Route />
    // in /src/index.js
    // whatever is in push is one of the defined routes
    // anonymous arrow function is a callback function
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
    // this.props.reset();
  }

  render() {

    const {handleSubmit} = this.props;

    // handleSubmit (redux side) runs and then the callback this.onSubmit runs
    // .bind(this) is used because this.onSubmit is a callback function so it is
    // executed in a different context outside of our component
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label = "Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

// 1) Validate function is called automatically
// 2) If we return an empty errors object
// Redux form assumes that nothing is wrong with our form
// so if it has anything in that object, it assumes something
// IS wrong
function validate(values) {
  // Values will contain properties title, categories, and content with their Values
  const errors = {};

  // Validate the input from the values object
  if(!values.title) {
    // .title (and others) chosen SPECIFICALLY b/c the field tags have corresponding
    // name properties
    // name property on first field tag is "title"
    errors.title="Enter a title";
  }
  if(!values.categories) {
    errors.categories="Enter some categories";
  }
  if(!values.content) {
    errors.content="Enter some content please";
  }
  return errors;
}

export default reduxForm({
  validate,
  // the form property key has to be unique
  // that is the only requirement
  // if there was another file that used the same named form
  // it would combine the two states together
  form: 'PostsNewForm'
})(
  connect(null, {createPost})(PostsNew)
);
