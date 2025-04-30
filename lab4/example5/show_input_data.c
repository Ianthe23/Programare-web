#include <stdio.h>

int main() {
    char line[1000];
    
    printf("Content-type: text/html\n\n");
    printf("<html><body>\n");
    
    // Read line by line
    while (fgets(line, sizeof(line), stdin) != NULL) {
        printf("%s", line);
    }
    
    printf("</body></html>\n");
    return 0;
}