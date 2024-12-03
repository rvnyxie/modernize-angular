import { Component, OnInit } from '@angular/core';
import { columnConfig } from "../column-config";
import { CommunesClient } from "./client/communes.client";
import { Commune } from "./model/commune";

@Component({
  selector: 'ord-communes',
  templateUrl: './communes.component.html',
  styleUrl: './communes.component.scss'
})
export class CommunesComponent implements OnInit {
  columns = columnConfig.commune;
  data: Commune[] = [];

  constructor(private communesClient: CommunesClient) {
  }

  ngOnInit() {
    this.loadCommunes();
  }

  /**
   * Load list of communes
   */
  loadCommunes() {
    this.communesClient.getCommunes().subscribe({
      next: (communes: Commune[]) => {
        this.data = communes
      },
      error: (err) => {
        console.error("Load Communes failed with error: " + err);
      }
    })
  }

  /**
   * Delete a commune row
   * @param rowNeedToBeDeleted Commune row need to be deleted
   */
  deleteCommune(rowNeedToBeDeleted: any) {
    this.communesClient.deleteCommuneById(rowNeedToBeDeleted.id).subscribe({
      next: (response) => {
        alert(`Successfully deleted commune: ${response}`);
        this.loadCommunes();
      },
      error: (err) => {
        console.error("Delete commune failed: " + err);
      }
    })
  }
}
