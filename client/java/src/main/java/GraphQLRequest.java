import java.security.cert.CertificateException;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class GraphQLRequest {

    public static void main(String[] args) throws Exception {
        OkHttpClient client = getUnsafeOkHttpClient();

        String url = "https://localhost:3000/graphql";
        MediaType mediaType = MediaType.get("application/json; charset=utf-8");

        String query = """
                {
                    "query": "query { \
                                 book (id: 7){ \
                                     title \
                                     id \
                                     author \
                                 } \
                             } "
                    }
                """;

        RequestBody body = RequestBody.create(query, mediaType);
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                // .addHeader("Authorization", "Bearer YOUR_ACCESS_TOKEN")
                .build();

        Response response = client.newCall(request).execute();
        System.out.println(response.body().string());
    }

    private static OkHttpClient getUnsafeOkHttpClient() {
        try {
            // Create a trust manager that does not validate certificate chains
            final TrustManager[] trustAllCerts = new TrustManager[] {
                    new X509TrustManager() {
                        @Override
                        public void checkClientTrusted(java.security.cert.X509Certificate[] chain, String authType)
                                throws CertificateException {
                        }

                        @Override
                        public void checkServerTrusted(java.security.cert.X509Certificate[] chain, String authType)
                                throws CertificateException {
                        }

                        @Override
                        public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                            return new java.security.cert.X509Certificate[]{};
                        }
                    }
            };

            // Install the all-trusting trust manager
            final SSLContext sslContext = SSLContext.getInstance("SSL");
            sslContext.init(null, trustAllCerts, new java.security.SecureRandom());
            // Create an ssl socket factory with our all-trusting manager
            final SSLSocketFactory sslSocketFactory = sslContext.getSocketFactory();

            OkHttpClient okHttpClient = new OkHttpClient.Builder()
                                            .sslSocketFactory(sslSocketFactory, (X509TrustManager)trustAllCerts[0])
                                            .hostnameVerifier(new HostnameVerifier() {
                                                @Override
                                                public boolean verify(String hostname, SSLSession session) {
                                                    return true;
                                                }
                                            })
                                            .build();

            return okHttpClient;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}