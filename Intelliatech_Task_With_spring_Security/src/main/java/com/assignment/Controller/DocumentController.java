package com.assignment.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.assignment.exception.ResponseStatusException;
import com.assignment.helper.FileUploadHelper;
import com.assignment.model.Document;
import com.assignment.model.User;
import com.assignment.repository.DocumentRepository;
import com.google.gson.Gson;

@RestController
public class DocumentController {
	@Autowired

	private FileUploadHelper fileUploadHelper;

	@Autowired
	private DocumentRepository documentRepository;

	@PostMapping(value = "/upload-file")
	public String uploaddetails(@RequestPart("user") String user, @ModelAttribute MultipartFile file,
			@ModelAttribute MultipartFile document) throws Exception {
		System.out.println("ps");
		System.out.println(file.getOriginalFilename());
		Gson gs = new Gson();
		Document newUser = gs.fromJson(user, Document.class);
		newUser.setImageName(file.getOriginalFilename());
		newUser.setFile_name(document.getOriginalFilename());
		System.out.println(user);
		System.out.println(file.getOriginalFilename());
		String originalFilename = file.getOriginalFilename();

		// validation
		try {
			if (file.isEmpty()) {
				return "Empty Image";
			}

			boolean f = fileUploadHelper.uploadFile(file);
		} catch (Exception e) {
			e.printStackTrace();
		}

		if (!file.getContentType().equals("image/jpeg") && !file.getContentType().equals("image/png")) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only JPEG and PNG images are allowed");
		}

		documentRepository.save(newUser);

		return "success";

	}

}
