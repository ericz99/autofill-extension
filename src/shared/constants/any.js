// # DEFAULT PROFILE
export const testProfile = {
  profileName: "Test Profile",
  firstName: "Test",
  lastName: "Profile",
  email: "TestProfile@gmail.com",
  phone: "1234567890",
  address: "123 Main Street",
  address2: "Apartment 1",
  city: "New York",
  state: "NY",
  zipCode: "10001",
  cardName: "Test Profile",
  cardNumber: "1234567891234567",
  expMonth: "01",
  expYear: "2020",
  cvv: "123",
  country: "United States",
};

// # DEFAULT CONFIG
export const defaultConfig = {
  shopify: {
    navigateSteps: true,
    processPayment: false,
    skipToCheckout: false,
  },
  supreme: {
    checkTerms: false,
    processPayment: false,
  },
  stripe: {
    autofill: false,
    processPayment: false,
  },
};
