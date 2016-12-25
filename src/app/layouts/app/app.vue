<template src="./app.html"></template>
<script src="./app.js" lang="babel"></script>
<style scoped lang="scss">
	.fade-enter-active, .fade-leave-active {
		transition: opacity 2s
	}
	.fade-enter, .fade-leave-active {
		opacity: 0
	}

    #app-toolbar {
        background: url('~assets/img/toolbar_bg.png') repeat;
        padding: 0px 20px !important;
        display: block !important;
		position: relative;
	    z-index: 99999;

	    #dropdown-box {
		    height: 300px;
		    width: 300px;
		    position: absolute;
		    background: #fff;
		    z-index: 9999999999;
		    right: 115px;
		    margin-top: 5px;
		    transition-property: all;
		    transition-duration: .5s;
		    transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
	    }

	    #dropdown-box::after {
		    height: 0px;
		    width: 0px;
		    border-bottom: 10px solid #fff;
		    border-left: 10px solid transparent;
		    border-right: 10px solid transparent;
		    position: absolute;
		    left: 50%;
		    top: -10px;
		    margin-left: -10px;
		    content: ' ';
	    }

        #right-actions {
            .md-menu button {
                margin-top: 1px;
            }
            ul {
                list-style-type: none;

                li {
                    float: left;
                    padding-right: 15px;
                    border-right: 1px dashed #fff;

                    &:nth-child(1){
                        color: #2196F3;
                        padding-bottom: 2px;
                    }

                    &:nth-child(2){
                        padding-left: 15px;
                    }

                    &:nth-child(1), &:nth-child(2){
                        line-height: 37px;
                    }

                    &:last-child {
                        margin-right: 0px;
                        border-right: 0px;
                        padding-right: 0px;
                        padding-left: 15px;
                    }
                }
            }
        }
    }

    #app-sub-toolbar {
        background: #2196F3 !important;
        color: #fff;
        width: 100%;
    }

</style>