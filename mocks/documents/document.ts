import {IDocumentReceive, IDocumentItemForm, IDocumentVpItem, IDocumentUser} from "~/models/documentModel";

export const documentMockItems: IDocumentItemForm[] = [
    {
        id: 'd01',
        document_name: 'ใบรับรองแพทย์',
        schema_type: 'ใบรับรองแพทย์',
        status: 'พร้อมใช้งาน',
        created_at: '2020-05-01 00:00:01',
        modified_at: '2020-05-01 00:00:01',
        created_by: 'พรประภา บุญรอด',
        signed_by: 'สมหญิง เจริญพร',
        receive_by: 'สมชาย บุญมี',
        cid: 'id:idin:vcx1'
    },
    {
        id: 'd02',
        document_name: 'ใบรับรองแพทย์',
        schema_type: 'ใบรับรองแพทย์',
        status: 'พร้อมใช้งาน',
        created_at: '2020-05-01 00:00:01',
        modified_at: '2020-05-01 00:00:01',
        created_by: 'พรประภา บุญรอด',
        signed_by: 'สมหญิง เจริญพร',
        receive_by: 'สมชาย บุญมี',
        cid: 'id:idin:vcx1'
    },
    {
        id: 'd03',
        document_name: 'ใบรับรองแพทย์',
        schema_type: 'ใบรับรองแพทย์',
        status: 'รอการรับรอง',
        created_at: '2020-05-01 00:00:01',
        modified_at: '2020-05-01 00:00:01',
        created_by: 'พรประภา บุญรอด',
        signed_by: 'สมหญิง เจริญพร',
        receive_by: 'สมชาย บุญมี',
        cid: 'id:idin:vcx1'
    },
    {
        id: 'd04',
        document_name: 'ใบรับรองแพทย์',
        schema_type: 'ใบรับรองแพทย์',
        status: 'ส่งสำเร็จ',
        created_at: '2020-05-01 00:00:01',
        modified_at: '2020-05-01 00:00:01',
        created_by: 'พรประภา บุญรอด',
        signed_by: 'สมหญิง เจริญพร',
        receive_by: 'สมชาย บุญมี',
        cid: 'id:idin:vcx1'
    },
    {
        id: 'd05',
        document_name: 'ใบรับรองแพทย์ทำใบขับขี่',
        schema_type: 'ใบรับรองแพทย์',
        status: 'ส่งสำเร็จ',
        created_at: '2020-05-01 00:00:01',
        modified_at: '2020-05-01 00:00:01',
        created_by: 'พรประภา บุญรอด',
        signed_by: 'สมหญิง เจริญพร',
        receive_by: 'สมชาย บุญมี',
        cid: 'id:idin:vcx1'
    },
    {
        id: 'd06',
        document_name: 'ใบรับรองแพทย์ทำใบขับขี่',
        schema_type: 'ใบรับรองแพทย์',
        status: 'พร้อมใช้งาน',
        created_at: '2020-05-01 00:00:01',
        modified_at: '2020-05-01 00:00:01',
        created_by: 'พรประภา บุญรอด',
        signed_by: 'สมหญิง เจริญพร',
        receive_by: 'สมชาย บุญมี',
        cid: 'id:idin:vcx1'
    },
    {
        id: 'd07',
        document_name: 'ใบรับรองแพทย์ทำใบขับขี่',
        schema_type: 'ใบรับรองแพทย์',
        status: 'พร้อมใช้งาน',
        created_at: '2020-05-01 00:00:01',
        modified_at: '2020-05-01 00:00:01',
        created_by: 'พรประภา บุญรอด',
        signed_by: 'สมหญิง เจริญพร',
        receive_by: 'สมชาย บุญมี',
        cid: 'id:idin:vcx1'
    },
    {
        id: 'd08',
        document_name: 'ใบรับรองแพทย์ทำใบขับขี่',
        schema_type: 'ใบรับรองแพทย์',
        status: 'พร้อมใช้งาน',
        created_at: '2020-05-01 00:00:01',
        modified_at: '2020-05-01 00:00:01',
        created_by: 'พรประภา บุญรอด',
        signed_by: 'สมหญิง เจริญพร',
        receive_by: 'สมชาย บุญมี',
        cid: 'id:idin:vcx1'
    },
    {
        id: 'd09',
        document_name: 'ใบรับรองแพทย์ทำใบขับขี่',
        schema_type: 'ใบรับรองแพทย์',
        status: 'เพิกถอน',
        created_at: '2020-05-01 00:00:01',
        modified_at: '2020-05-01 00:00:01',
        created_by: 'พรประภา บุญรอด',
        signed_by: 'สมหญิง เจริญพร',
        receive_by: 'สมชาย บุญมี',
        cid: 'id:idin:vcx1'
    },
    {
        id: 'd10',
        document_name: 'ใบรับรองแพทย์ทำใบขับขี่',
        schema_type: 'ใบรับรองแพทย์',
        status: 'ยกเลิก',
        created_at: '2020-05-01 00:00:01',
        modified_at: '2020-05-01 00:00:01',
        created_by: 'พรประภา บุญรอด',
        signed_by: 'สมหญิง เจริญพร',
        receive_by: 'สมชาย บุญมี',
        cid: 'id:idin:vcx1'
    },
    {
        id: 'd11',
        document_name: 'ใบรับรองแพทย์ทำใบขับขี่',
        schema_type: 'ใบรับรองแพทย์',
        status: 'ถูกปฎิเสธการลงนาม',
        created_at: '2020-05-01 00:00:01',
        modified_at: '2020-05-01 00:00:01',
        created_by: 'พรประภา บุญรอด',
        signed_by: 'สมหญิง เจริญพร',
        receive_by: 'สมชาย บุญมี',
        cid: 'id:idin:vcx1'
    },
    {
        id: 'd12',
        document_name: 'ใบรับรองแพทย์ทำใบขับขี่',
        schema_type: 'ใบรับรองแพทย์',
        status: 'ถูกปฎิเสธการลงนาม',
        created_at: '2020-05-01 00:00:01',
        modified_at: '2020-05-01 00:00:01',
        created_by: 'พรประภา บุญรอด',
        signed_by: 'สมหญิง เจริญพร',
        receive_by: 'สมชาย บุญมี',
        cid: 'id:idin:vcx1'
    },
    {
        id: 'd13',
        document_name: 'ใบรับรองแพทย์',
        schema_type: 'ใบรับรองแพทย์',
        status: 'รอการรับรอง',
        created_at: '2020-05-01 00:00:01',
        modified_at: '2020-05-01 00:00:01',
        created_by: 'พรประภา บุญรอด',
        signed_by: 'สมหญิง เจริญพร',
        receive_by: 'สมชาย บุญมี',
        cid: 'id:idin:vcx1'
    },
    {
        id: 'd14',
        document_name: 'ใบรับรองแพทย์',
        schema_type: 'ใบรับรองแพทย์',
        status: 'รอการรับรอง',
        created_at: '2020-05-01 00:00:01',
        modified_at: '2020-05-01 00:00:01',
        created_by: 'พรประภา บุญรอด',
        signed_by: 'สมหญิง เจริญพร',
        receive_by: 'สมชาย บุญมี',
        cid: 'id:idin:vcx1'
    },
]



export const documentReceiveMock: IDocumentReceive[] = [
    {
        id: 'd01',
        name: 'มารวย สินมั่นคงมี',
        did: 'did:2334567432456476',
        email: 'Marouy@gmail.com'
    },
    {
        id: 'd02',
        name: 'มารวย สินมั่นคงมี',
        did: 'did:2334567432456476',
        email: 'Marouy@gmail.com'
    },
    {
        id: 'd03',
        name: 'มารวย สินมั่นคงมี',
        did: 'did:2334567432456476',
        email: 'Marouy@gmail.com'
    },
    {
        id: 'd04',
        name: 'มารวย สินมั่นคงมี',
        did: 'did:2334567432456476',
        email: 'Marouy@gmail.com'
    },
    {
        id: 'd05',
        name: 'มารวย สินมั่นคงมี',
        did: 'did:2334567432456476',
        email: 'Marouy@gmail.com'
    },
    {
        id: 'd06',
        name: 'มารวย สินมั่นคงมี',
        did: 'did:2334567432456476',
        email: 'Marouy@gmail.com'
    },
]


export const documentMockDisplay: IDocumentItemForm[] = [
    {
        id: 'd01',
        document_name: 'การยื่นเอกสารเคลมประกัน',
        schema_type: '2',
        status: 'เปิดใช้งาน',
        created_at: '2021-08-20 00:00:01',
        modified_at: '2021-08-20 00:00:01',
        created_by: 'นันยศ พินิจนันท์',
        signed_by: 'นันยศ พินิจนันท์',
        did: 'did:bqJf6yDhEmyHyaWJ',
        receive_by: '100',
        tag: 'ตรวจแล้ว',
        json: '{"name":"John","age":30,"city":"New York"}'
    },
    {
        id: 'd02',
        document_name: 'การยื่นเอกสารเคลมประกัน',
        schema_type: '2',
        status: 'เปิดใช้งาน',
        created_at: '2021-08-25 00:00:01',
        modified_at: '2021-08-25 00:00:01',
        created_by: 'วรรณภา พุ่มสนธิ',
        did: 'did:vgrarV6pMoA2CDjb4tyF',
        signed_by: 'วรรณภา พุ่มสนธิ',
        receive_by: '100',
        tag: ''
    },
]


export const documentUserMock: IDocumentUser[] = [
    {
        id: 'u01',
        document_name: 'Medical Certificate',
        schema_type: 'MedicalCertificate',
    },
    {
        id: 'u02',
        document_name: 'E-Receipt',
        schema_type: 'EReceipt',
    },
]

export const documentVpMock: IDocumentVpItem[] = []
