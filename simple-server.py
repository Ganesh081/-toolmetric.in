#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys

# Change to the directory containing the files
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class DebugHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        # Custom logging to see what's being requested
        print(f"[{self.log_date_time_string()}] {format % args}")
        print(f"Serving file: {self.path}")

    def do_GET(self):
        # Debug: Print the requested path
        print(f"Request path: {self.path}")
        
        # Handle clean URLs
        path = self.path.lstrip('/')
        
        # Root path
        if path == '' or path == '/':
            path = 'index.html'
        # Clean URLs without .html
        elif not path.endswith('.html') and not path.endswith('.css') and not path.endswith('.js') and not path.endswith('.xml') and not path.endswith('.txt') and not path.endswith('.ico'):
            # Check if file exists with .html extension
            if os.path.exists(path + '.html'):
                path = path + '.html'
                print(f"Redirecting to: {path}")
        
        # Set the path
        self.path = '/' + path
        
        # Call parent method
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

PORT = 8000

Handler = DebugHTTPRequestHandler
httpd = socketserver.TCPServer(("", PORT), Handler)

print(f"Debug server running at http://localhost:{PORT}/")
print("Files in directory:", os.listdir('.'))
httpd.serve_forever()
