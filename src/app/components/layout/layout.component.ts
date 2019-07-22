import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import WebviewTag = Electron.WebviewTag;
import Cookie = Electron.Cookie;

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
})
export class LayoutComponent implements OnInit, AfterViewInit {
  @ViewChildren('webview') webviews: QueryList<ElementRef>;

  webview1: WebviewTag;
  webview2: WebviewTag;

  UserAgent: any[];

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.webview1 = this.webviews.first.nativeElement;
    this.webview2 = this.webviews.last.nativeElement;
  }

  go(url: string) {
    this.webview1.src = url;

    this.webview1.addEventListener('dom-ready', () => {
      const session = this.webview1.getWebContents().session;

      session.cookies.get({ domain: '' }, (error, cookies: Cookie[]) => {
        this.UserAgent = [];
        cookies.forEach(x => {
          this.UserAgent.push({
            domain: x.domain,
            name: x.name,
            value: x.value,
          });
        });

        console.log('w1', this.UserAgent);
      });
    });

    this.webview2.src = url;

    this.webview2.addEventListener('dom-ready', () => {
      const session = this.webview2.getWebContents().session;

      session.cookies.get({ domain: '' }, (error, cookies: Cookie[]) => {
        this.UserAgent = [];
        cookies.forEach(x => {
          this.UserAgent.push({
            domain: x.domain,
            name: x.name,
            value: x.value,
          });
        });

        console.log('w2', this.UserAgent);
      });
    });
  }
}
