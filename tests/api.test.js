describe('Auth in bookstore', () => {
  test('Success user creation', async () => {
    const response = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "userName": "polzovatel4",
        "password": "passworD!1"
      })
    })
    expect(response.status).toBe(201);
  });

  test('User is already exists', async () => {
    const response = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "userName": "polzovatel4",
        "password": "passworD!1"
      })
    })
    const data = await response.json();
    expect(data.message).toBe('User exists!')
    expect(response.status).toBe(406);
  });

  test('Password does not meet the requirements', async () => {
    const response = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "userName": "polzovatel4",
        "password": "passw"
      })
    })
    const data = await response.json();
    expect(data.code).toBe("1300");
    expect(response.status).toBe(400);
  });

  test('Token successfuly created', async () => {
    const response = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "userName": "polzovatel4",
        "password": "passworD!1"
      })
    })
    const data = await response.json();
    expect(data.result).toBe('User authorized successfully.')
    expect(response.status).toBe(200);
  });
  
  test('Auth failed', async () => {
    const response = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "userName": "polzovatel4",
        "password": "passwo"
      })
    })
    const data = await response.json();
    expect(data.status).toBe('Failed')
    expect(data.result).toBe('User authorization failed.')
    expect(response.status).toBe(200);
  });
});