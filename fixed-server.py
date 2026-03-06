#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys

# Change to the directory containing the files
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class FixedHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        # Custom logging to see what's being requested
        print(f"[{self.log_date_time_string()}] {format % args}")
        print(f"Original path: {self.path}")

    def do_GET(self):
        # Debug: Print the requested path
        print(f"Request received: {self.path}")
        
        # Get the path
        original_path = self.path
        path = self.path.lstrip('/')
        
        # Handle root path
        if path == '' or path == '/':
            final_path = 'index.html'
        # Handle clean URLs (without .html extension)
        elif not path.endswith('.html') and not path.endswith('.css') and not path.endswith('.js') and not path.endswith('.xml') and not path.endswith('.txt') and not path.endswith('.ico') and not path.endswith('.png') and not path.endswith('.jpg') and not path.endswith('.jpeg') and not path.endswith('.gif') and not path.endswith('.svg'):
            # Check if file exists with .html extension
            html_file = path + '.html'
            if os.path.exists(html_file):
                final_path = html_file
                print(f"Clean URL detected, serving: {final_path}")
            else:
                final_path = path  # Serve as-is if no .html found
        else:
            final_path = path
        
        # Check if the final file exists
        if os.path.exists(final_path):
            print(f"Serving file: {final_path}")
            self.path = '/' + final_path
            return http.server.SimpleHTTPRequestHandler.do_GET(self)
        else:
            print(f"File not found: {final_path}")
            self.send_error(404, f"File not found: {final_path}")
            return

PORT = 8000

Handler = FixedHTTPRequestHandler
httpd = socketserver.TCPServer(("", PORT), Handler)

print(f"Fixed server running at http://localhost:{PORT}/")
print("Files in directory:", [f for f in os.listdir('.') if f.endswith('.html')])
print("CGPA calculator exists:", os.path.exists('cgpa-calculator.html'))
httpd.serve_forever()
