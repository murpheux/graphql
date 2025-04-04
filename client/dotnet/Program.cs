var handler = new HttpClientHandler
{
	ServerCertificateCustomValidationCallback = (request, cert, chain, errors) =>
	{
		Console.WriteLine("SSL error skipped");
		return true;
	}
};

var client = new HttpClient(handler);

var request = new HttpRequestMessage(HttpMethod.Post, "https://localhost:3000/graphql");

var content = new StringContent("{\"query\":\"{\\n  books {\\n    title\\n    id\\n  }\\n}\",\"variables\":{}}", null, "application/json");
request.Content = content;

var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();

Console.WriteLine(await response.Content.ReadAsStringAsync());
