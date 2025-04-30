#include <stdio.h>
#include <stdlib.h>

int main() {
    // First output the content type header
    printf("Content-type: text/html\n\n");
    
    // Start HTML output
    printf("<html><head><title>HTTP Headers</title></head>\n");
    printf("<body>\n");
    printf("<h1>HTTP Request Headers</h1>\n");
    printf("<table border='1'>\n");
    printf("<tr><th>Header Name</th><th>Value</th></tr>\n");
    
    // Display common HTTP headers from environment variables
    printf("<tr><td>Request Method</td><td>%s</td></tr>\n", getenv("REQUEST_METHOD") ? getenv("REQUEST_METHOD") : "N/A");
    printf("<tr><td>Query String</td><td>%s</td></tr>\n", getenv("QUERY_STRING") ? getenv("QUERY_STRING") : "N/A");
    printf("<tr><td>Content Type</td><td>%s</td></tr>\n", getenv("CONTENT_TYPE") ? getenv("CONTENT_TYPE") : "N/A");
    printf("<tr><td>Content Length</td><td>%s</td></tr>\n", getenv("CONTENT_LENGTH") ? getenv("CONTENT_LENGTH") : "N/A");
    printf("<tr><td>User Agent</td><td>%s</td></tr>\n", getenv("HTTP_USER_AGENT") ? getenv("HTTP_USER_AGENT") : "N/A");
    printf("<tr><td>Remote Address</td><td>%s</td></tr>\n", getenv("REMOTE_ADDR") ? getenv("REMOTE_ADDR") : "N/A");
    printf("<tr><td>Request URI</td><td>%s</td></tr>\n", getenv("REQUEST_URI") ? getenv("REQUEST_URI") : "N/A");
    printf("<tr><td>Server Protocol</td><td>%s</td></tr>\n", getenv("SERVER_PROTOCOL") ? getenv("SERVER_PROTOCOL") : "N/A");
    printf("<tr><td>Server Name</td><td>%s</td></tr>\n", getenv("SERVER_NAME") ? getenv("SERVER_NAME") : "N/A");
    printf("<tr><td>Server Port</td><td>%s</td></tr>\n", getenv("SERVER_PORT") ? getenv("SERVER_PORT") : "N/A");
    
    // Display all environment variables (including all HTTP headers)
    printf("</table>\n");
    printf("<h2>All Environment Variables</h2>\n");
    printf("<pre>\n");
    
    // On Unix/Linux systems, you can use the environ variable
    extern char **environ;
    for (char **env = environ; *env != NULL; env++) {
        printf("%s\n", *env);
    }
    
    printf("</pre>\n");
    printf("</body></html>\n");
    
    return 0;
}