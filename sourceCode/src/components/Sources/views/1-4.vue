<template>
    <div class="willDo">
      <Row>
        <Col push="8">
          <Card style="width:320px">
            <div style="text-align:center">
              <Badge dot>
                <Icon type="ios-notifications-outline" size="32"></Icon>
              </Badge>
              <h3>尊敬的管理员，您暂时没有代办事项。</h3>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
</template>

<script>
    export default {
        name: "1-4"
    }
</script>

<style scoped>
   .willDo{
     margin-top: 40px;
   }
</style>
