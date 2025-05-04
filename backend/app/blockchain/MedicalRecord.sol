// SPDX-License-Identifier: MIT 

//compiler version
pragma solidity ^0.8.0; 

//declare
contract MedicalRecord {
    struct Record {
        string patientName;
        string diagnosis;
        string filePathHash;
        uint timestamp;
    }

//array strct
    Record[] public records;

//event declare
    event RecordAdded(string patientName, string diagnosis, string filePathHash, uint timestamp);


//add record
    function addRecord(string memory _patientName, string memory _diagnosis, string memory _filePathHash) public {
        records.push(Record(_patientName, _diagnosis, _filePathHash, block.timestamp));
        emit RecordAdded(_patientName, _diagnosis, _filePathHash, block.timestamp);
    }


//get record
    function getRecord(uint index) public view returns (string memory, string memory, string memory, uint) {
        Record memory rec = records[index];
        return (rec.patientName, rec.diagnosis, rec.filePathHash, rec.timestamp);
    }


//record count
    function getRecordCount() public view returns (uint) {
        return records.length;
    }
}
