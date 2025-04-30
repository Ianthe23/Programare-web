#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    char post_data[1024] = "";

    printf("Content-type: text/html\n\n");
    printf("<html><body>\n");

    // Get the content length
    char *content_length_str = getenv("CONTENT_LENGTH");
    int content_length = 0;

    if (content_length_str != NULL) {
        content_length = atoi(content_length_str);
        
        if (content_length > 0 && content_length < sizeof(post_data)) {
            // Read exactly content_length bytes
            if (fread(post_data, 1, content_length, stdin) > 0) {
                post_data[content_length] = '\0'; // null-terminate the string
                printf("<h2>Am primit de la browser: %s</h2>\n", post_data);
            } else {
                printf("<h2>Eroare la citirea datelor POST</h2>\n");
            }
        } else {
            printf("<h2>Content length invalid %d</h2>\n", content_length);
        }
    } else {
        printf("<h2>Nu am primit date POST</h2>\n");
    }

    printf("</body></html>\n");
    return 0;
}
