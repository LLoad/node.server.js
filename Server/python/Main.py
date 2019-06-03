# Main.py
import os
import cv2.cv as cv2
import numpy as np
from PIL import Image
import DetectChars
import DetectPlates
import pytesseract
import sys
import json

tesseract_path = 'C:\Program Files\Tesseract-OCR'
pytesseract.tesseract_cmd = tesseract_path + '/tesseract'

# module level variables
SCALAR_BLACK = (0.0, 0.0, 0.0)
SCALAR_WHITE = (255.0, 255.0, 255.0)
SCALAR_YELLOW = (0.0, 255.0, 255.0)
SCALAR_GREEN = (0.0, 255.0, 0.0)
SCALAR_RED = (0.0, 0.0, 255.0)
kernel = np.ones((5,5), np.uint8)

showSteps = False
###################################################################################################
def main():
    blnKNNTrainingSuccessful = DetectChars.loadKNNDataAndTrainKNN() 

    if blnKNNTrainingSuccessful == False:                               # if KNN training was not successful
        print("\nerror: KNN traning was not successful\n")               # show error message
        return                                                          # and exit program
    # end if

    # imgOriginalScene  = cv2.imread("originalImage.jpg")               # open image
    imgOriginalScene = cv2.imread("originalImage.jpg")
    if imgOriginalScene is None:                            
        print("\nerror: image not read from file \n\n")
        os.system("pause")
        return
    # end if

    listOfPossiblePlates = DetectPlates.detectPlatesInScene(imgOriginalScene) 

    listOfPossiblePlates = DetectChars.detectCharsInPlates(listOfPossiblePlates) 

    cv2.imshow("imgOriginalScene", imgOriginalScene)

    if len(listOfPossiblePlates) == 0:                          
        print("\nno license plates were detected\n")
    else:
                # if we get in here list of possible plates has at leat one plate. Sort the list of possible plates in DESCENDING order (most number of chars to least number of chars)
        listOfPossiblePlates.sort(key = lambda possiblePlate: len(possiblePlate.strChars), reverse = True)

                # suppose the plate with the most recognized chars (the first plate in sorted by string length descending order) is the actual plate
        licPlate = listOfPossiblePlates[0]

        cv2.imwrite("imgPlate.jpg", licPlate.imgPlate)
        cv2.imshow("imgPlate", licPlate.imgPlate)
        # cv2.imwrite("imgThresh.jpg", licPlate.imgThresh)
        cv2.imshow("imgThresh", licPlate.imgThresh)

        if len(licPlate.strChars) == 0:                    
            return
        # end if

        drawRedRectangleAroundPlate(imgOriginalScene, licPlate) 

        print("\nlicense plate read from image = " + licPlate.strChars + "\n") 
        print("----------------------------------------")

        writeLicensePlateCharsOnImage(imgOriginalScene, licPlate)
        cv2.imshow("imgOriginalScene", imgOriginalScene)
        # cv2.imwrite("imgOriginalScene.png", imgOriginalScene)

    cv2.waitKey(0)

    return
###################################################################################################
def drawRedRectangleAroundPlate(imgOriginalScene, licPlate):

    p2fRectPoints = cv2.boxPoints(licPlate.rrLocationOfPlateInScene)

    cv2.line(imgOriginalScene, tuple(p2fRectPoints[0]), tuple(p2fRectPoints[1]), SCALAR_RED, 2)
    cv2.line(imgOriginalScene, tuple(p2fRectPoints[1]), tuple(p2fRectPoints[2]), SCALAR_RED, 2)
    cv2.line(imgOriginalScene, tuple(p2fRectPoints[2]), tuple(p2fRectPoints[3]), SCALAR_RED, 2)
    cv2.line(imgOriginalScene, tuple(p2fRectPoints[3]), tuple(p2fRectPoints[0]), SCALAR_RED, 2)
###################################################################################################
def writeLicensePlateCharsOnImage(imgOriginalScene, licPlate):
    ptCenterOfTextAreaX = 0                             # this will be the center of the area the text will be written to
    ptCenterOfTextAreaY = 0

    ptLowerLeftTextOriginX = 0                          # this will be the bottom left of the area that the text will be written to
    ptLowerLeftTextOriginY = 0

    sceneHeight, sceneWidth, sceneNumChannels = imgOriginalScene.shape
    plateHeight, plateWidth, plateNumChannels = licPlate.imgPlate.shape

    intFontFace = cv2.FONT_HERSHEY_SIMPLEX                      # choose a plain jane font
    fltFontScale = float(plateHeight) / 30.0                    # base font scale on height of plate area
    intFontThickness = int(round(fltFontScale * 1.5))           # base font thickness on font scale

    textSize, baseline = cv2.getTextSize(licPlate.strChars, intFontFace, fltFontScale, intFontThickness)        # call getTextSize

            # unpack roatated rect into center point, width and height, and angle
    ( (intPlateCenterX, intPlateCenterY), (intPlateWidth, intPlateHeight), fltCorrectionAngleInDeg ) = licPlate.rrLocationOfPlateInScene

    intPlateCenterX = int(intPlateCenterX)              # make sure center is an integer
    intPlateCenterY = int(intPlateCenterY)

    ptCenterOfTextAreaX = int(intPlateCenterX)         # the horizontal location of the text area is the same as the plate

    if intPlateCenterY < (sceneHeight * 0.75):                                                  # if the license plate is in the upper 3/4 of the image
        ptCenterOfTextAreaY = int(round(intPlateCenterY)) + int(round(plateHeight * 1.6))      # write the chars in below the plate
    else:                                                                                       # else if the license plate is in the lower 1/4 of the image
        ptCenterOfTextAreaY = int(round(intPlateCenterY)) - int(round(plateHeight * 1.6))      # write the chars in above the plate
    # end if

    textSizeWidth, textSizeHeight = textSize                # unpack text size width and height

    ptLowerLeftTextOriginX = int(ptCenterOfTextAreaX - (textSizeWidth / 2))           # calculate the lower left origin of the text area
    ptLowerLeftTextOriginY = int(ptCenterOfTextAreaY + (textSizeHeight / 2))          # based on the text area center, width, and height

            # write the text on the image
    cv2.putText(imgOriginalScene, licPlate.strChars, (ptLowerLeftTextOriginX, ptLowerLeftTextOriginY), intFontFace, fltFontScale, SCALAR_YELLOW, intFontThickness)
###################################################################################################
def areaSetting():
    image = cv2.imread('imgPlate.jpg')
    # cv2.imwrite('imgPlateOriginal.jpg', image)
    cv2.imshow('imgPlateOriginal', image)

    imgPlateGray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # cv2.imwrite('imgPlateGray.jpg', grayImage)
    cv2.imshow('imgPlateGray', imgPlateGray)

    imgPlateThreshold = cv2.threshold(imgPlateGray, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
    # cv2.imwrite('imgPlateThreshold.jpg', thresholdImage)
    cv2.imshow('imgPlateThreshold', imgPlateThreshold)

    cv2.waitKey(0)

    # opening = cv2.morphologyEx(gray, cv2.MORPH_OPEN, kernel)
    # cv2.imwrite('00opening.png', opening)
    #
    # erosion = cv2.erode(gray, kernel, iterations = 1)
    # cv2.imwrite('00erosion.png', erosion)

    # blur = cv2.blur(opening, (1,1))
    # cv2.imwrite('blur.png', blur)
    # blur2 = cv2.GaussianBlur(opening, (3, 3), 0)
    # cv2.imwrite('blur2.png', blur2)
    # blur3 = cv2.medianBlur(opening, 7)
    # cv2.imwrite('blur3.png', blur3)

    # th2 = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 15, 2)
    # cv2.imwrite('th2.png', th2)
#####################################################################################################
def ocr_tesseract():
    image_file1 = 'drugImage1.jpg'
    im1 = Image.open(image_file1)
    text1 = pytesseract.image_to_string(im1)
    print('resultOriginal', text1)

if __name__ == "__main__":
  main()
  areaSetting()
  ocr_tesseract()



















