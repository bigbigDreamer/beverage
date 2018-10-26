<template>
     <div>
        <Row>
          <Col push="10">
            <Upload
              multiple
              action="/test/uploadPic.action" name="myFile">
              <Button icon="ios-cloud-upload-outline">Upload files</Button>
            </Upload>
          </Col>
        </Row>
     </div>
</template>

<script>
    export default {
        name: "food"
    }
</script>

<style scoped>

</style>
