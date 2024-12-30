import java.io.*;
import java.net.*;

public class PingClient {
    public static void main(String[] args) {
        String host = "localhost"; // Server address
        int port = 8080; // Server port

        System.out.println("Attempting to connect to server at " + host + ":" + port);
        try (Socket socket = new Socket(host, port);
             PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
             BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()))) {

            System.out.println("Connected to server.");

            for (int i = 0; i < 100; i++) {
                out.println("ping");
                System.out.println("Sent: ping");

                String response = in.readLine();
                System.out.println("Received: " + response);
            }
            System.out.println("Completed 100 iterations.");
        } catch (IOException e) {
            System.err.println("Error occurred: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
