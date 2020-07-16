import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent implements OnInit {
    constructor(private route: ActivatedRoute, private router: Router) {}

    public ngOnInit(): void {}

    public goBack(): void {
        this.router.navigate(['/']);
    }
}
