# ng-check-available
Simple directive for checking if a value is taken i.e username/email

# Installation

`bower install --save ng-check-available`

# Usage
```js
angular.module('myApp', ['ngCheckAvailable']);
```

```html
<form name="signupForm">
    <label>Email</label>
    <input name="email" type="email"
    data-ng-model="user.email"
    data-ng-check-available data-check-available-endpoint="/api/emails"
    required>
    <!-- Messages -->
    <div data-ng-messages="signupForm.email.$error">
        <p data-ng-message="ngCheckAvailable">Email already in use</p>
        <p data-ng-message="required">This field is required</p>
    </div>
    <!-- Pending message -->
    <div data-ng-show="signupForm.email.$pending.ngCheckAvailable">
        <p>Checking...</p>
    </div>
</form>
```