import { Component } from "@angular/core";

@Component({
  selector: "app-top-bar",
  templateUrl: "./top-bar.component.html",
  styleUrls: ["./top-bar.component.css"],
})
export class TopBarComponent {
  githubUrl: string = "https://github.com/VietNgo95/demo-grpc-spring-mongodb";
}
