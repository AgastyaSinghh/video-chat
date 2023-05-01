import { Component } from '@angular/core';
import { MediaControllerService } from 'src/app/services/media-controller.service';
// import { DialogOverviewExampleDialog } from '../media-controller.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-device-change-modal',
  templateUrl: './device-change-modal.component.html',
  styleUrls: ['./device-change-modal.component.css']
})
export class DeviceChangeModalComponent {
  deviceList: MediaDeviceInfo[] = []
  cameraList: MediaDeviceInfo[] = []
  speakerList: MediaDeviceInfo[] = []
  micList: MediaDeviceInfo[] = []

  constructor(
    private mediaControllerService: MediaControllerService,
    public dialogRef: MatDialogRef<DeviceChangeModalComponent>,

  ) { }

  displayMediaDevices() {
    this.mediaControllerService.getDeviceList()
      .then((devices: any) => {
        this.deviceList = devices;
        this.updateCameraAndMic()
        console.log(devices)
      })
      .catch((err) => {
        alert("Failed to fetch all media devices!")
        console.error(`${err.name}: ${err.message}`);
        this.deviceList = []
        this.updateCameraAndMic()
      });

  }

  updateCameraAndMic() {
    this.cameraList = []
    this.micList = []
    this.speakerList = []

    this.deviceList.forEach(device => {
      if (device.kind == "videoinput")
        this.cameraList.push(device)
      if (device.kind == "audioinput")
        this.micList.push(device)
      if (device.kind == "audiooutput")
        this.speakerList.push(device)
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
