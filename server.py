#!/usr/bin/env python3
import http.server
import socketserver
import os
from urllib.parse import unquote

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the path
        path = self.path.lstrip('/')
        
        # Handle root path
        if path == '' or path == '/':
            path = 'index.html'
        # Handle clean URLs (remove .html extension)
        elif not path.endswith('.html') and not path.endswith('.css') and not path.endswith('.js') and not path.endswith('.xml') and not path.endswith('.txt') and not path.endswith('.ico'):
            # Check if corresponding .html file exists
            html_path = path + '.html'
            if os.path.exists(html_path):
                path = html_path
            # Also check for directory index
            elif os.path.exists(path) and os.path.isdir(path):
                if os.path.exists(os.path.join(path, 'index.html')):
                    path = os.path.join(path, 'index.html')
        
        # Decode URL encoding
        path = unquote(path)
        
        # Set the file path
        self.path = '/' + path
        
        # Call the parent class method to handle the request
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

    def end_headers(self):
        # Add security headers
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'DENY')
        self.send_header('X-XSS-Protection', '1; mode=block')
        http.server.SimpleHTTPRequestHandler.end_headers(self)

PORT = 8000

with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
    print(f"Serving HTTP on :: port {PORT} (http://localhost:{PORT}/)")
    httpd.serve_forever()
