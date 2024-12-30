import java.io.*;
import java.net.*;

public class PongServer {
    public static void main(String[] args) {
        int port = 8080; // Server port
        try (ServerSocket serverSocket = new ServerSocket(port)) {
            System.out.println("PongServer is running on port " + port);

            try (Socket clientSocket = serverSocket.accept();
                 BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
                 PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true)) {

                System.out.println("Client connected: " + clientSocket.getInetAddress());

                for (int i = 0; i < 100; i++) {
                    String received = in.readLine();
                    System.out.println("Received: " + received);

                    if ("ping".equalsIgnoreCase(received)) {
                        out.println("pong");
                        System.out.println("Sent: pong");
                    }
                }
                System.out.println("Completed 100 iterations. Closing connection.");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
