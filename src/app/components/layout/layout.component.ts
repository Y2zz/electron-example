import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import WebviewTag = Electron.WebviewTag;
import Cookie = Electron.Cookie;

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
})
export class LayoutComponent implements OnInit, AfterViewInit {

  @ViewChildren('webview') webviews: QueryList<ElementRef>;

  webview: WebviewTag;

  UserAgent: any[];

  constructor() {

  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.webview = this.webviews.first.nativeElement;
    // console.log(this.webview);
  }

  go(url: string) {
    this.webview.src = url;

    this.webview.addEventListener('dom-ready', () => {
      const session = this.webview.getWebContents().session;

      // session.cookies.addListener('changed', () => {
      //   session.cookies.get({ url: url }, (error, cookies) => {
      //     // this.UserAgent = cookies;
      //   });
      // });

      session.cookies.get({ domain: '.dayu.com' }, (error, cookies: Cookie[]) => {
        // console.log('cookies:', cookies);

        const v = cookies.map(x => ({
          domain: x.domain, name: x.name, value: x.value,
        }));

        if ( !this.UserAgent) {
          this.UserAgent = [];
        }

        this.UserAgent.push(v); // = [...this.UserAgent, v];


        console.log(this.UserAgent);
      });
    });
  }
}
